const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

// Get current user from idToken
module.exports.currentUser = async (token) => {
  const user = await admin.auth().verifyIdToken(token);
  return user;
};

module.exports.deleteUser = async (token, uid) => {
  return this.currentUser(token).then((user) => {
    if (user.admin === true) {
      // Delete user's doc on Firestore
      admin.firestore().collection("scores").doc(uid).delete();

      // Delete user's account on Authentication
      return admin
        .auth()
        .deleteUser(uid)
        .then(() => {
          return { message: "Deleted successfully!" };
        })
        .catch((error) => error);
    } else {
      return { message: "Admins ONLY" };
    }
  });
};

module.exports.toggleUserRole = async (token, uid, op) => {
  return this.currentUser(token).then((user) => {
    if (user.admin === true) {
      return admin
        .auth()
        .setCustomUserClaims(uid, {
          admin: op,
        })
        .then(() => {
          return {
            message: `${op === true ? "upgrade" : "downgrade"} successfully!`,
          };
        })
        .catch((error) => error);
    } else {
      return { message: "Admins ONLY" };
    }
  });
};
