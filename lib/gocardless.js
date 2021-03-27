const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

const setRedirectFlow = async function (customer) {
  try {
    const redirectFlow = await client.redirectFlows.create({
      description: "Happy Paws",
      session_token: "dummy_session_token3",
      success_redirect_url: "http://localhost:3000/customer/om/success",
      // Optionally, prefill customer details on the payment page
      prefilled_customer: {
        given_name: customer.given_name,
        family_name: customer.family_name,
        email: customer.email,
        address_line1: customer.address_line1,
        city: customer.city,
        postal_code: customer.postal_code,
      },
    });
    console.log("RedirectFlow ID", redirectFlow.id);
    console.log("RedirectFlow redirect URL", redirectFlow.redirect_url);

    return redirectFlow;
  } catch (error) {
    console.log("error body", error);
    console.error(error);
  }
};

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
  setRedirectFlow,
  setRedirectFlowComplete,
};
