const {client} = require('./utils/gocardless');

exports.handler = async (event) => {
  // get the customer ID from the query request
  const queryID = event.queryStringParameters.id;

  try {
    let { subscriptions } = await client.subscriptions.list({
      customer: queryID
    });

    console.log("Get GC subscriptions:", subscriptions);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(subscriptions),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
