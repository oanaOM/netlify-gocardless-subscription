import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { getSubscriptions, createSubscription } from "../../lib/gocardless";

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
  const customerID = req.query.id;

  switch (req.method) {
    case "GET":
      console.log("GET Subscriptions request it's been initiated ");
      var subscriptions = await getSubscriptions(customerID);
      return res.json(subscriptions);
    case "POST":
      var customerSubscription = await createSubscription(req.body);
      return res.json(customerSubscription);
    default:
      break;
  }

  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" });
}
