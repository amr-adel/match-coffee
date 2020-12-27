const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function (event, context) {
  const secret = event.body.secret.json();

  return admin
    .auth()
    .verifyIdToken(secret)
    .then((decodedToken) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(decodedToken),
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
