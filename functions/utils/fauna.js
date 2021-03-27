const fetch = require('node-fetch');

exports.faunaFetch = async ({ query, variables }) => {

  return await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_FAUNA_SERVER_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};

exports.faunaGet = async ({ query, variables }) => {
  return await fetch('https://graphql.fauna.com/graphql', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_FAUNA_SERVER_SECRET}`,
    }
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};