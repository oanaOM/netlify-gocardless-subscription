const { getSubscriptions } = require("../lib/gocardless");

exports.handler = async () => {
  let subscriptions = await getSubscriptions();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify(subscriptions),
  };
};
