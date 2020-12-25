const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

exports.handler = async function (event, context) {
  return admin
    .auth()
    .getUser("zavUsdNfT0cvWV6Qaaa3dxUCB3o1")
    .then((userRecord) => {
      return {
        statusCode: 200,
        body: JSON.stringify(userRecord),
      };
    })
    .catch((error) => `Error fetching user data:${error}`);
};
