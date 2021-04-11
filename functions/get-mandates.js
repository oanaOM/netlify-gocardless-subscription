const {client} = require("./utils/gocardless");

exports.handler = async () => {
  // get all mandates that are not cancelled

  try {
    const mandatesList = await client.mandates.list();

    const mandatesActive = mandatesList.mandates.filter(
      (mandate) => mandate.status !== "cancelled"
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(mandatesActive),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
