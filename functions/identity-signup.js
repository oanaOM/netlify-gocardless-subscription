const { faunaFetch } = require("./utils/fauna");

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  const netlifyID = user.id;

  const gocardlessID = 2;

  // TODO: store the Netlify and GoCardless IDs in Fauna
  const response = await faunaFetch({
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
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))

  console.log("user:", JSON.stringify(user, null, 2));
  console.log("db user:", response);

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["sub:free"],
      },
    }),
  };
};
