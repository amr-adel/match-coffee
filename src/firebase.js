/* eslint-disable no-unused-vars */
/*global firebase, Promise*/

const firebaseConfig = {
  apiKey: "AIzaSyAYRoUaWtm9ZEQJ58wNNzfgoEnq5DbkpgI",
  authDomain: "match-coffee.firebaseapp.com",
  projectId: "match-coffee",
  appId: "1:513373961544:web:e1db2a98946be08380077d",
};

// Handle Firebase errors
const handleError = (origin, error) => {
  // console.info(`From ${origin}:`);
  // console.error(error);
  return { errorMsg: error.message || `${origin} error!` };
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser;

// Track user auth state change
auth.onAuthStateChanged((user) => {
  if (user) {
    const { uid, displayName, email } = user;
    currentUser = { uid, displayName, email };

    user.getIdTokenResult().then((idTokenResult) => {
      currentUser.isAdmin = idTokenResult.claims.admin;
    });

    // Add "displayName" to currentUser after sign up
    const confirmUserDisplayName = () => {
      if (!currentUser.displayName) {
        currentUser.displayName = auth.currentUser.displayName;

        setTimeout(() => confirmUserDisplayName(), 500);
      }
    };

    confirmUserDisplayName();
  } else {
    currentUser = null;
  }
});

// Create new user
const createUser = (name, email, password, score) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Add user's display name
      auth.currentUser.updateProfile({ displayName: name });
    })
    // Create a doc on Firestore to hold user's display name & score
    .then(() => {
      db.collection("scores")
        .doc(auth.currentUser.uid)
        .set({ displayName: name, beans: score || 0 });
    })
    .then(() => name)
    .catch((error) => handleError("createUser", error));

// Login user
const loginUser = (email, password, score) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      if (score) {
        await addBeans(score);
      }

      return userCredential.user.displayName;
    })
    .catch((error) => handleError("loginUser", error));

// Log out user
const logout = () => auth.signOut();

// Add score to user doc
const addBeans = async (beans) => {
  if (beans < 1) return;

  const result = await fetch(
    `https://match-coffee.netlify.app/.netlify/functions/addBeans?beansToAdd=${beans}&token=${await getToken()}`
  ).then((response) => response.json());

  if (!result.message.includes("successfully!"))
    handleError("addBeans", result);

  return result;
};

// Get beans for certain user
const getUserScore = (uid = currentUser.uid) =>
  db
    .collection("scores")
    .doc(uid)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => handleError("getUserScore", error).errorMsg);

// Get 20 users with highest scores
const getLeaderboard = (n) =>
  db
    .collection("scores")
    .orderBy("beans", "desc")
    .limit(n)
    .get()
    .then((querySnapshot) => {
      const leaderboardArray = [];
      querySnapshot.forEach((doc) => {
        leaderboardArray.push({
          name: doc.data().displayName,
          beans: doc.data().beans,
          uid: doc.id,
          isCurrentUser: currentUser && doc.id === currentUser.uid,
        });
      });
      return leaderboardArray;
    })
    .catch((error) => handleError("getLeaderboard", error).errorMsg);

// Delete user doc and account
const deleteUser = async (password) => {
  const R = await reauthenticate(password);
  if (R && R.errorMsg) return R;

  const DUC = await deleteUserDoc(currentUser.uid);
  if (DUC && DUC.errorMsg) return DUC;

  const DUA = await deleteUserAccount();
  if (DUA && DUA.errorMsg) return DUA;

  return "Account deleted, You will be missed.";
};

// Delete doc by docId
const deleteUserDoc = (docId = currentUser.uid) =>
  db
    .collection("scores")
    .doc(docId)
    .delete()
    .catch((error) => handleError("deleteUserDoc", error));

// Reauthenticate with password
const reauthenticate = (password) => {
  let credentials = firebase.auth.EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  return auth.currentUser
    .reauthenticateWithCredential(credentials)
    .catch((error) => handleError("reauthenticate", error));
};

// Delete user Auth account
const deleteUserAccount = () =>
  auth.currentUser
    .delete()
    .catch((error) => handleError("deleteUserAccount", error));

// Admin functions ===========================================================================

// Get new idToken
const getToken = async () => {
  const token = await auth.currentUser.getIdToken(true);
  return token;
};

// Get all users
const getUsers = async () => {
  const users = await fetch(
    `https://match-coffee.netlify.app/.netlify/functions/getUsers?token=${await getToken()}`
  ).then((response) => response.json());

  // Catch error
  if (users.message) {
    console.log(users);
    return;
  }

  const usersDocs = await getLeaderboard(1000);

  const usersList = {
    admins: [],
    users: [],
    orphanAccounts: [],
    orphanDocs: [],
  };

  const usersTemp = {};

  for (let user of users) {
    usersTemp[user.uid] = user;
  }

  for (let doc of usersDocs) {
    if (!usersTemp[doc.uid]) {
      usersList.orphanDocs.push(doc);
    } else {
      if (usersTemp[doc.uid].isAdmin === true) {
        usersList.admins.push({
          ...doc,
          ...usersTemp[doc.uid],
        });
      } else {
        usersList.users.push({
          ...doc,
          ...usersTemp[doc.uid],
        });
      }

      delete usersTemp[doc.uid];
    }
  }

  for (let orphanAccount in usersTemp) {
    usersList.orphanAccounts.push(usersTemp[orphanAccount]);
  }

  return usersList;
};

// Toggle user role
const toggleUserRole = async (uid, op) => {
  const result = await fetch(
    `https://match-coffee.netlify.app/.netlify/functions/toggleUserRole?uid=${uid}&op=${op}&token=${await getToken()}`
  ).then((response) => response.json());

  return result;
};

// Delete user by admin
const deleteUserByAdmin = async (uid, docOnly) => {
  const result = await fetch(
    `https://match-coffee.netlify.app/.netlify/functions/deleteUser?uid=${uid}&token=${await getToken()}&docOnly=${docOnly}`
  ).then((response) => response.json());

  return result;
};

// Create random users from "https://randomuser.me"
const createRandomUsers = async (n) => {
  const users = await fetch(
    `https://randomuser.me/api/?results=${n}&inc=login,email,name&password=upper,lower,number,8`
  )
    .then((res) => res.json())
    .then((data) => data.results);

  const randomScore = () => Math.floor(Math.random() * 84);

  for (let user of users) {
    logout();

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );

    await createUser(
      user.name.first,
      user.email,
      user.login.password,
      randomScore()
    );

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
  }
};
// createRandomUsers(20);

export {
  createUser,
  loginUser,
  logout,
  addBeans,
  getUserScore,
  getLeaderboard,
  deleteUser,
  currentUser,
  getUsers,
  toggleUserRole,
  deleteUserByAdmin,
};

// setTimeout(async () => {
//   const result = await deleteUserByAdmin("", true);
//   console.log(result);
// }, 3000);
