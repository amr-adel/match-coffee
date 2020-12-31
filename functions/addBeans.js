const { addBeans } = require("./firebaseAdmin");

exports.handler = async function (event) {
  const token = event.queryStringParameters.token;
  const beansToAdd = Number(event.queryStringParameters.beansToAdd);

  const { message } = await addBeans(token, beansToAdd);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message }),
  };
};
