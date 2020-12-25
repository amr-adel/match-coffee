const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

exports.handler = async function (event, context) {
  const uid = event.queryStringParameters.uid;

  return admin
    .auth()
    .setCustomUserClaims(uid, {
      admin: true,
    })
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: "Upgraded successfully!" }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
