const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function (event, context) {
  const senderUid = event.queryStringParameters.senderUid;
  const uid = event.queryStringParameters.uid;

  admin.firestore().collection("scores").doc(uid).delete();

  return admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Deleted successfully!",
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
