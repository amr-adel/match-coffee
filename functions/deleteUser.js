const { deleteUser } = require("./firebaseAdmin");

exports.handler = async (event) => {
  const token = event.queryStringParameters.token;
  const uid = event.queryStringParameters.uid;

  const { message } = await deleteUser(token, uid);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message }),
  };
};
