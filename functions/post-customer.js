const {client} = require("./utils/gocardless");

exports.handler = async (context) => {
  const data = JSON.parse(context.body);

  const { email, netlifyID } = data;

  try {
      const redirectFlow = await client.redirectFlows.create({
        description: "Happy Paws",
        session_token: "dummy_session_token3",
        success_redirect_url: `http://localhost:8888/customer/${netlifyID}/subscribe`,
        // Optionally, prefill customer details on the payment page
        prefilled_customer: {
          email: email,
        },
      });
      console.log("RedirectFlow ID", redirectFlow.id);
      console.log("RedirectFlow redirect URL", redirectFlow.redirect_url);

    //   return redirectFlow;
    console.log(data);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(redirectFlow),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
