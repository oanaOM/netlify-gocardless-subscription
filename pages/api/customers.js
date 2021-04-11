import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { customerList, setRedirectFlow } from "../../lib/gocardless";

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

  switch (req.method) {
    case "GET":
      console.log("GET request it's been initiated ");
      var customers = await customerList();
      return res.json(customers);
    case "POST":
      var customer = await setRedirectFlow(req.body);
      return res.json(customer);
    // res.json({ message: "Hello Everyone!" });

    default:
      break;
  }

  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" });
}
