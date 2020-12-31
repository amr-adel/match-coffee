const { toggleUserRole } = require("./firebaseAdmin");

exports.handler = async function (event) {
  const token = event.queryStringParameters.token;
  const uid = event.queryStringParameters.uid;
  const op = event.queryStringParameters.op === "upgrade" ? true : null;

  const { message } = await toggleUserRole(token, uid, op);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message }),
  };
};
