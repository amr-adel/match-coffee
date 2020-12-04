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
const createUser = (name, email, password) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.updateProfile({ displayName: name });
      return user;
    })
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

// Login user
const loginUser = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });

export { createUser, loginUser, currUser };
