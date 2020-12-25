// const admin = require("firebase-admin");
// const adminCredentials = process.env.ADMIN_SDK_CERT;

// admin.initializeApp({
//   credential: admin.credential.cert(adminCredentials),
// });

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
