const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

exports.handler = async function (event, context) {
  return admin
    .auth()
    .listUsers()
    .then((listUsersResult) => listUsersResult.users)
    .then((users) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ users }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
