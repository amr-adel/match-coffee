const { deleteUser } = require("./firebaseAdmin");

const headers = {
  "Access-Control-Allow-Origin": "*",
};

exports.handler = async (event) => {
  const token = event.queryStringParameters.token;
  const uid = event.queryStringParameters.uid;

  return deleteUser(token, uid)
    .then(({ message }) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message }),
      };
    })
    .catch(({ message }) => {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(message),
      };
    });
};
