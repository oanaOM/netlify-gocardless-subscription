import { IdentityContextProvider } from "react-netlify-identity-widget";
import "../styles/globals.css";

// If (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks/");
// }

function Application({ Component, pageProps, element }) {
  const url = "https://nervous-minsky-4dcffc.netlify.app";
  return (
    <IdentityContextProvider url={url}>
      <Component {...pageProps} />
    </IdentityContextProvider>
  );
}

export default Application;
