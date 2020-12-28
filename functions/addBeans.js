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
  const beansToAdd = Number(event.queryStringParameters.beansToAdd);

  if ([1, 2, 3, 4, 5].indexOf(beansToAdd) != -1) {
    return admin
      .firestore()
      .collection("scores")
      .doc(user.uid)
      .update({
        beans: admin.firestore.FieldValue.increment(beansToAdd),
      })
      .then(() => {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: `Add ${beansToAdd} beans successfull`,
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
        message: "Try harder",
      }),
    };
  }
};
