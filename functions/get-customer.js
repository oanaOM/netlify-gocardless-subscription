const { faunaFetch } = require("./utils/fauna");

exports.handler = async (event, context) => {
  const { user } = context.clientContext;

  const query = `
    query ($netlifyID: ID!) {
      getUserByNetlifyID(netlifyID: $netlifyID){
        gocardlessID
        netlifyID
      }
    }
  `;

  const variables = { netlifyID: user.sub };

  const result = await faunaFetch({ query, variables });

  const { gocardlessID } = result.data.getUserByNetlifyID;

  return {
    statusCode: 200,
    body: JSON.stringify(gocardlessID),
  };
};
