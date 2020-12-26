const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async function (event, context) {
  return admin
    .auth()
    .listUsers()
    .then((listUsersResult) => listUsersResult.users)
    .then((users) => {
      return users.map((user) => {
        return {
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          isAdmin: () => {
            if (user.customClaims) return customClaims.admin;
            return false;
          },
        };
      });
    })
    .then((users) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ users }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(error),
      };
    });
};
