const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants");
const { faunaFetch } = require("./utils/fauna");

const clientGC = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  const netlifyID = user.id;

  const gocardlessID = 2;

  // TODO: store the Netlify and GoCardless IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $gocardlessID: ID!) {
        createUser(data: { netlifyID: $netlifyID gocardlessID: $gocardlessID }) {
          netlifyID
          gocardlessID
        }
      }
    `,
    variables: {
      netlifyID: netlifyID,
      gocardlessID: gocardlessID,
    },
  });

  console.log("user", JSON.stringify(user, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["sub:free"],
      },
    }),
  };
};
