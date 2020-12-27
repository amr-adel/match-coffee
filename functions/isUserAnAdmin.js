const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function (event, context) {
  const token = event.queryStringParameters.token;

  return admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: `${user.name} is${user.admin ? "" : " NOT"} an admin`,
        }),
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
