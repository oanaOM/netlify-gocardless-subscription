const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

exports.client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);
