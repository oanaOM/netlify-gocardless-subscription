const { client } = require("./utils/gocardless");

exports.handler = async (context) => {
  const data = JSON.parse(context.body);

  const { redirect_flow_id } = data;

  try {
    // const redirectFlowComplete = await client.redirectFlows.complete(
    //   redirect_flow_id,
    //   {
    //     session_token: "dummy_session_token3",
    //   }
    // );

    // console.log(`Confirmation URL: ${redirectFlowComplete.confirmation_url}`);
    // console.log("redirectFlow", redirectFlowComplete);

    console.log(redirect_flow_id);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify("redirectFlowComplete"),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
