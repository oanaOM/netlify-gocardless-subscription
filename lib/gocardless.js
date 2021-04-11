const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");
const { tryGetPreviewData } = require("next/dist/next-server/server/api-utils");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

const setRedirectFlow = async function (customer) {
  try {
    const netlifyID = customer.netlifyID;
    const customerEmail = customer.email;
    console.log(">>>", customer);

    const redirectFlow = await client.redirectFlows.create({
      description: "Happy Paws",
      session_token: "dummy_session_token3",
      success_redirect_url: `http://localhost:3000/customer/${netlifyID}/subscribe`,
      // Optionally, prefill customer details on the payment page
      prefilled_customer: {
        email: customerEmail,
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

const customerList = async function () {
  try {
    const customers = await client.customers.list();
    return customers
  } catch (err) {
    console.error(err);
  }
}


const getSubscriptions = async function (id) {
  try {
    const subscriptionsList = await client.subscriptions.list({
      customer: id,
    });
    const subscriptionsActive = subscriptionsList.subscriptions.filter(
      (subscription) => subscription.status === "active"
    );
    return subscriptionsActive;
  } catch (err) {
    console.log("error ", err);
  }
}

const createSubscription = async function (data) {
  try {
    const randomIpodencyKey = `${data.mandate}_${Math.random()}`;
    const newSubscription = await client.subscriptions.create(
      {
        amount: data.amount,
        currency: "GBP",
        name: data.subscription_type,
        interval: 1,
        interval_unit: "monthly",
        day_of_month: 5,
        links: {
          mandate: data.mandate,
        },
      },
      randomIpodencyKey
    );
    console.log(">>>request body: ", data)
    console.log(newSubscription.id);
    return newSubscription;
  } catch (err) {
    console.error(err);
    throw err
  }
};


const getActiveMandates = async function () {
  try {

    const mandatesList = await client.mandates.list();

    
    const mandatesActive = mandatesList.mandates.filter(
      (mandate) => mandate.status !== "cancelled"
    );

    return mandatesActive;
    
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  customerList,
  getSubscriptions,
  setRedirectFlow,
  setRedirectFlowComplete,
  createSubscription,
  getActiveMandates,
};
