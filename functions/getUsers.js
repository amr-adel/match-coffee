const { getUsers } = require("./firebaseAdmin");

exports.handler = async (event) => {
  const token = event.queryStringParameters.token;

  const users = await getUsers(token);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(users),
  };
};
