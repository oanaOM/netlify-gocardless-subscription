const {client} = require("./utils/gocardless");

exports.handler = async () => {
  // get all mandates that are not cancelled

  try {
    const customers = await client.customers.list();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(customers),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
