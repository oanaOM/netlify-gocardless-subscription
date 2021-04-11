const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

const setRedirectFlowComplete = async function (id) {
  try {
    const redirectFlowComplete = await client.redirectFlows.complete(id, {
      session_token: "dummy_session_token3",
    });

    console.log(`Confirmation URL: ${redirectFlowComplete.confirmation_url}`);
    console.log("redirectFlow", redirectFlowComplete);

    return redirectFlowComplete;
  } catch (error) {
    console.log("error body", error);
    console.error(error);
  }
};

module.exports = {
  setRedirectFlowComplete,
};
