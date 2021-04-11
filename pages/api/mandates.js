import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { getActiveMandates } from "../../lib/gocardless";

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
      var mandates = await getActiveMandates();
      return res.json(mandates);
    case "POST":
      break;
    default:
      break;
  }

  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" });
}
