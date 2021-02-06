const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

const gcClient = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);


exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  console.log(JSON.stringify(user, null, 2));

  // TODO: create a customer record in Fauna
  // TODO: create a new GC customer
  const customer = await client.customers.create({
    email: user.email,
    given_name: "Bam",
    family_name: "Bob",
    address_line1: "27 Acer Road",
    address_line2: "Apt 2",
    city: "London",
    postal_code: "E8 3GX",
    country_code: "GB",
    metadata: {
      salesforce_id: "ABCD1234"
    }
  });

  console.log("GC Customer: ", customer)
  
  // await client.subscriptions.create({
  //   amount: "2500",
  //   currency: "GBP",
  //   name: "Monthly Magazine",
  //   interval_unit: "monthly",
  //   day_of_month:  "1",
  //   metadata: {
  //     order_no: "ABCD1234"
  //   },
  //   links: {
  //     mandate: "MA123"
  //   }
  // });


  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['sub:free'],
      },
    }),
  };
};