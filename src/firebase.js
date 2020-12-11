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
    .then((userCredential) => {
      if (score) {
        addScore(score);
      }
      return userCredential.user.displayName;
    })
    .catch((error) => handleError("loginUser", error));

// Log out user
const logout = () => auth.signOut();

// Add score to user doc
const addScore = (score) =>
  db
    .collection("scores")
    .doc(auth.currentUser.uid)
    .update({
      beans: firebase.firestore.FieldValue.increment(score),
    })
    .catch((error) => handleError("addScore", error).errorMsg);

// Get beans for certain user
const getUserScore = (id = currentUser.uid) =>
  db
    .collection("scores")
    .doc(id)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => handleError("getUserScore", error).errorMsg);

// Get 20 users with highest scores
const getLeaderboard = () =>
  db
    .collection("scores")
    .orderBy("beans", "desc")
    .limit(20)
    .get()
    .then((querySnapshot) => {
      const leaderboardArray = [];
      querySnapshot.forEach((doc) => {
        leaderboardArray.push({
          name: doc.data().displayName,
          beans: doc.data().beans,
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

export {
  createUser,
  loginUser,
  logout,
  addScore,
  getUserScore,
  getLeaderboard,
  deleteUser,
  currentUser,
};
