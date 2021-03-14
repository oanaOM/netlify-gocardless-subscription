import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { setCustomerTest } from "../../lib/gocardless";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  // https://nextjs.org/docs/api-routes/api-middlewares
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  console.log(req.headers.referer);

  console.log("_____________");

  switch (req.method) {
    case "GET":
      console.log("GET request it's been initiated ");
      res.json({
        text: "You should not see this via a CORS request.",
      });
      break;
    case "POST":
      console.log("POST request it's been initiated ");
      const customer = await setCustomerTest(req.body);
      let response = {
        message: customer,
      };
      console.log(response)
      return res.json(response);
    default:
      break;
  }

  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" });
}
