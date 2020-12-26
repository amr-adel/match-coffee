const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function (event, context) {
  return admin
    .auth()
    .listUsers()
    .then((listUsersResult) => listUsersResult.users)
    .then((users) => {
      return users.map((user) => {
        let isAdmin = false;

        if (user.customClaims) {
          isAdmin = user.customClaims.admin;
        }

        return {
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          isAdmin,
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
