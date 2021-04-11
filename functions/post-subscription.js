const {client} = require("./utils/gocardless");

exports.handler = async (context) => {
    const data = JSON.parse(context.body);

    const { amount, mandate, subscription_type } = data;
    const randomIpodencyKey = `${mandate}_${Math.random()}`;

try {
      
   const newSubscription = await client.subscriptions.create(
      {
        amount: amount,
        currency: "GBP",
        name: subscription_type,
        interval: 1,
        interval_unit: "monthly",
        day_of_month: 5,
        links: {
          mandate: mandate,
        },
      },
      randomIpodencyKey
    );
    console.log(">>>request body: ", data)
    console.log(newSubscription.id);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(newSubscription),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
