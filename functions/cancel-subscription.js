const { client } = require("./utils/gocardless");

exports.handler = async (event, context) => {
  const { id } = JSON.parse(event.body);
  try {
    const cancelSubscription = await client.subscriptions.cancel(
      id
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(cancelSubscription),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
