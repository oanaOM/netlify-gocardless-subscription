const gocardless = require("gocardless-nodejs");

const constants = require("gocardless-nodejs/constants");

const client = gocardless(
  // We recommend storing your access token in an environment
  // variable for security
  process.env.REACT_APP_GC_AUTHORIZATION_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox
);

const getCustomers = async function () {
  try {
    const listResponse = await client.customers.list();
    const customers = listResponse.customers;

    return customers;
  } catch (err) {
    console.error(err);
  }
};

const getCustomerByID = async function (id) {
  try {
    console.log("API getCustomerByID request: ", id);
    const customer = await client.customers.find(id);
    return customer;
  } catch (err) {
    console.error(err)
    return err
  }
};

const setCustomer = async function (customer) {
  try {
    const redirectFlow = await client.redirectFlows.create({
      description: "Happy Paws",
      session_token: "dummy_session_token3",
      success_redirect_url: "http://localhost:3000/subscription",
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

    console.log("Starting complete redirect flow");

    return redirectFlow.redirect_url;
  } catch (error) {
    console.log("error body", error.body);
    console.error(error);
  }
};

// setCustomerComplete completes the redirect flow process
// or if the redirect process has already been completed returns the creditor/customer ID
// @id - reference to redirect flow ID
const setCustomerComplete = async function (id) {
  const customer = {
    code: 200,
    mandate: "",
    id: "",
  }
try {
  const redirectFlowResponse = await client.redirectFlows.complete(
    id,{
      session_token: "dummy_session_token3"
    }
  )
  customer.mandate = redirectFlowResponse.links.mandate
  customer.id = redirectFlowResponse.links.customer
  return customer
} catch (err) {
  console.log("Ups, error: ",err)
  return err
}
 
};

const findRedirectFlow = async function (id) {
  try {
    const redirectFlow = await client.redirectFlows.find(id);
    return redirectFlow.links;
  } catch (err) {
    console.error(err)
    return err
  }
};

// setSubscription initiates a subscription
// @requestBody - subscription details: amount, name + mandate
const setSubscription = async function(requestBody){
  try {
    
    const details = {
      amount: parseInt(requestBody.amount),
      currency: "GBP",
      name: requestBody.name,
      interval: 1,
      interval_unit: requestBody.interval_unit,
      day_of_month: 5,
      links: {
        mandate: requestBody.mandate
      }
    }
    const subscription = await client.subscriptions.create(details, 'unique_subscription_specific_string_random_1234')

    return subscription
  } catch (err) {
    console.log("Ups! Subscription error. Got ", err)
    return err
  }
}

module.exports = {
  getCustomers,
  setCustomer,
  setCustomerComplete,
  getCustomerByID,
  findRedirectFlow,
  setSubscription
};
