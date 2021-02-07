const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants");
const fetch = require("node-fetch");


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

  const netlifyID = user.id;




  // TODO: create a new GC customer
  const gocardlessID = 1;
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
  

    // TODO: create a customer record in Fauna
    const response = async fetch('https://graphql.fauna.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
      },
      body: JSON.stringify({
        query:`
        mutation($netlifyID: ID!, gocardlessID: ID!){
          createUser(data: {netlifyID: netlifyID, gocardlessID: gocardlessID}){
            netlifyID,
            gocardlessID
          }
        }
        `,
        variables:{
          netlifyID,
          gocardlessID
        },
      }),
    })
    .then(res=>res.json())
    .catch((err)=>console.error(JSON.stringify(err, null, 2)));

    console.log({response});


  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['sub:free'],
      },
    }),
  };
};