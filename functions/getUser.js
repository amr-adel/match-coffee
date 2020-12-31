const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

module.exports.currUser = async (token) => {
  const user = await admin.auth().verifyIdToken(token);
  return user;
};
