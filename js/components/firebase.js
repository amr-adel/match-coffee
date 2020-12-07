var firebaseConfig = {
  apiKey: "AIzaSyAYRoUaWtm9ZEQJ58wNNzfgoEnq5DbkpgI",
  authDomain: "match-coffee.firebaseapp.com",
  projectId: "match-coffee",
  appId: "1:513373961544:web:e1db2a98946be08380077d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let db = firebase.firestore();

let currUser;

auth.onAuthStateChanged((user) => {
  if (user) {
    currUser = user;
  } else {
    currUser = null;
  }
});

// Handle Firebase errors
const handleError = (origin, error) => {
  // console.info(`From ${origin}:`);
  // console.error(error);
  return { errorMsg: error.message || `${origin} error!` };
};

// Create new user
const createUser = (name, email, password, beans) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      auth.currentUser.updateProfile({ displayName: name });
      db.collection("scores")
        .doc(res.user.uid)
        .set({ displayName: name, beans: beans || 0 });
      return res;
    })
    .catch((error) => handleError("createUser", error).errorMsg);

// Login user
const loginUser = (email, password, beans) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (beans) {
        db.collection("scores")
          .doc(user.user.uid)
          .update({
            beans: firebase.firestore.FieldValue.increment(beans),
          });
      }
      return user;
    })
    .catch((error) => handleError("loginUser", error).errorMsg);

// Get beans for certain user
const getBeans = (id) =>
  db
    .collection("scores")
    .doc(id)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => handleError("getBeans", error).errorMsg);

// Get 20 users with the highest score
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
          isCurrUser: currUser && doc.id === currUser.uid,
        });
      });
      return leaderboardArray;
    })
    .catch((error) => handleError("getLeaderboard", error).errorMsg);

// Delete user doc and account
const deleteUser = async (password) => {
  const DUC = await deleteUserDoc(currUser.uid);
  if (DUC && DUC.errorMsg) return DUC.errorMsg;

  const R = await reauthenticate(password);
  if (R && R.errorMsg) return R.errorMsg;

  const DUA = await deleteUserAccount();
  if (DUA && DUA.errorMsg) return DUA.errorMsg;

  return "Account deleted, You will be missed.";
};

// Delete doc by docId
const deleteUserDoc = (docId) =>
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
  db,
  auth,
  createUser,
  loginUser,
  getBeans,
  getLeaderboard,
  deleteUser,
  currUser,
};
