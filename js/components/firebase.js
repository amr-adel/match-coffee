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
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

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
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

// Get beans for certain user
const getBeans = (id) =>
  db
    .collection("scores")
    .doc(id)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
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
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

export { db, auth, createUser, loginUser, getBeans, getLeaderboard, currUser };
