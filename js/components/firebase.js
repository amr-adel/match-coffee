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
    .catch((error) => error.message);

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
    .catch((error) => error.message);

// Get beans for certain user
const getBeans = (id) =>
  db
    .collection("scores")
    .doc(id)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => {
      console.log(error.message);
      return "!!!";
    });

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
        });
      });
      return leaderboardArray;
    })
    .catch((error) => error.message);

// Delete user score and acount
const deleteUser = (password) => {
  return reauthenticate(password)
    .then((error) => {
      if (error) throw error;
      deleteDoc(auth.currentUser.uid);
    })
    .then((error) => {
      if (error) throw error;
      auth.currentUser.delete();
    })
    .then(() => "Account deleted, You will be missed.")
    .catch((error) => error.message);
};

// Delete doc by docId
const deleteDoc = (docId) => {
  return (
    db
      .collection("scores")
      .doc(docId)
      .delete()
      // .then(() => console.log("User doc deleted"))
      .catch((error) => error)
  );
};

// Reauthenticate with password
const reauthenticate = (password) => {
  let credentials = firebase.auth.EmailAuthProvider.credential(
    currUser.email,
    password
  );

  return (
    auth.currentUser
      .reauthenticateWithCredential(credentials)
      // .then(() => console.log("Reauthenticated"))
      .catch((error) => error)
  );
};

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
