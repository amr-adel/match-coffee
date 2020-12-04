var firebaseConfig = {
  apiKey: "AIzaSyAYRoUaWtm9ZEQJ58wNNzfgoEnq5DbkpgI",
  authDomain: "match-coffee.firebaseapp.com",
  projectId: "match-coffee",
  appId: "1:513373961544:web:e1db2a98946be08380077d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let currUser;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currUser = user;
  } else {
    currUser = null;
  }
});

// Create new user
const createUser = (name, email, password, beans) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      firebase.auth().currentUser.updateProfile({ displayName: name });
      firebase
        .firestore()
        .collection("scores")
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
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (beans) {
        firebase
          .firestore()
          .collection("scores")
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
  firebase
    .firestore()
    .collection("scores")
    .doc(id)
    .get()
    .then((doc) => doc.data().beans)
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

export { createUser, loginUser, getBeans, currUser };
