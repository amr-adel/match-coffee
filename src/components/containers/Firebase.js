import { Component, h } from "../../index.js";

// Handle Firebase errors
const handleError = (origin, error) => {
  // console.info(`From ${origin}:`);
  // console.error(error);
  return { errorMsg: error.message || `${origin} error!` };
};

const firebaseConfig = {
  apiKey: "AIzaSyAYRoUaWtm9ZEQJ58wNNzfgoEnq5DbkpgI",
  authDomain: "match-coffee.firebaseapp.com",
  projectId: "match-coffee",
  appId: "1:513373961544:web:e1db2a98946be08380077d",
};

class Firebase extends Component {
  state = {
    currentUser: null,
  };

  auth = null;
  db = null;

  componentDidMount() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.db = firebase.firestore();

    // Track user auth state change
    this.auth.onAuthStateChanged((user) =>
      this.setState({ currentUser: user ? user : null })
    );
  }

  // Create new user
  createUser = (name, email, password, score) =>
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Add user's display name
        this.auth.currentUser.updateProfile({ displayName: name });
      })
      // Create a doc on Firestore to hold user's display name & score
      .then(() => {
        this.db
          .collection("scores")
          .doc(this.auth.currentUser.uid)
          .set({ displayName: name, beans: score || 0 });
      })
      .then(() => name)
      .catch((error) => handleError("createUser", error));

  // Login user
  loginUser = (email, password, score) =>
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (score) {
          this.addScore(score);
        }
        return userCredential.user.displayName;
      })
      .catch((error) => handleError("loginUser", error));

  // Add score to user doc
  addScore = (score) =>
    this.db
      .collection("scores")
      .doc(this.state.currentUser.uid)
      .update({
        beans: firebase.firestore.FieldValue.increment(score),
      })
      .catch((error) => handleError("addScore", error).errorMsg);

  // Get beans for certain user
  getUserScore = (id) =>
    this.db
      .collection("scores")
      .doc(id)
      .get()
      .then((doc) => doc.data().beans)
      .catch((error) => handleError("getBeans", error).errorMsg);

  // Get 20 users with highest scores
  getLeaderboard = () =>
    this.db
      .collection("scores")
      .orderBy("beans", "desc")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        const leaderboardArray = [];
        const { currentUser } = this.state;
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
  deleteUser = async (password) => {
    const R = await this.reauthenticate(password);
    if (R && R.errorMsg) return R.errorMsg;

    const DUC = await this.deleteUserDoc(this.state.currentUser.uid);
    if (DUC && DUC.errorMsg) return DUC.errorMsg;

    const DUA = await this.deleteUserAccount();
    if (DUA && DUA.errorMsg) return DUA.errorMsg;

    return "Account deleted, You will be missed.";
  };

  // Delete doc by docId
  deleteUserDoc = (docId) =>
    this.db
      .collection("scores")
      .doc(docId)
      .delete()
      .catch((error) => handleError("deleteUserDoc", error));

  // Reauthenticate with password
  reauthenticate = (password) => {
    let credentials = firebase.auth.EmailAuthProvider.credential(
      this.auth.currentUser.email,
      password
    );

    return this.auth.currentUser
      .reauthenticateWithCredential(credentials)
      .catch((error) => handleError("reauthenticate", error));
  };

  // Delete user Auth account
  deleteUserAccount = () =>
    this.auth.currentUser
      .delete()
      .catch((error) => handleError("deleteUserAccount", error));

  render({}, { currentUser }) {
    console.log("this.props", this.props);
    const {
      createUser,
      loginUser,
      addScore,
      getUserScore,
      getLeaderboard,
      deleteUser,
    } = this;

    return h("aside", {
      createUser,
      loginUser,
      addScore,
      getUserScore,
      getLeaderboard,
      deleteUser,
      currentUser,
    });
  }
}

export { Firebase };
