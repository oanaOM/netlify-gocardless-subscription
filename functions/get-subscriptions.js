const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

exports.handler = async () => {
  try {
    let { subscriptions } = await client.subscrptions.list();

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
    return {
      statusCode: 404,
      body: JSON.stringify(err),
    };
  }
};
