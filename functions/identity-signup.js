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

  // TODO: create a new GC customer
  // create redirect flow
  const redirectFlow = await clientGC.redirectFlows.create({
    description: "Paws meals",
    session_token: "SESS_wSs0uGYMISxzqOBq",
    success_redirect_url: "https://nervous-minsky-4dcffc.netlify.app/success",
    prefilled_customer: {
      given_name: "Frank",
      family_name: "Osborne",
      email: user.email
    }
  });

  console.log("redirectFlow.id: ", redirectFlow.id);
  console.log("redirectFlow.redirect_url", redirectFlow.redirect_url); 

  // complete the redirect flow
  const completeRedirectFlow = await clientGC.redirectFlows.complete(
    redirectFlow.id,
    {
      session_token: "SESS_wSs0uGYMISxzqOBq"
    }
  );

  console.log(`Mandate: ${completeRedirectFlow.links.mandate}`);
  console.log(`Customer: ${completeRedirectFlow.links.customer}`);

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
