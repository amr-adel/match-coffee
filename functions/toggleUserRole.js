const admin = require("firebase-admin");
const adminCredentials = process.env.ADMIN_SDK_CERT;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(adminCredentials)),
});

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async function (event) {
  const token = event.queryStringParameters.token;
  const user = await admin.auth().verifyIdToken(token);

  if (user.admin === true) {
    const uid = event.queryStringParameters.uid;
    const op = event.queryStringParameters.op === "upgrade" ? true : null;

    return admin
      .auth()
      .setCustomUserClaims(uid, {
        admin: op,
      })
      .then(() => {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: `${op === true ? "upgrade" : "downgrade"} successfull`,
            op,
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
  } else {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Admins ONLY",
        user,
      }),
    };
  }
};
