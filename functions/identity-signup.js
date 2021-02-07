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

  const netlifyID = user.id;

  // TODO: create a new GC customer
  const gocardlessID = 1;

  // TODO: create a customer record in Fauna
  const response = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
    },
    body: JSON.stringify({
      query: `
      mutation($netlifyID: ID!, $gocardlessID: ID!){
        createUser(data: {netlifyID: $netlifyID, $gocardlessID: gocardlessID}){
          netlifyID,
          gocardlessID
        }
      } `,
      variables: {
        netlifyID,
        gocardlessID,
      },
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));

  console.log({ response });

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["sub:free"],
      },
    }),
  };
};
