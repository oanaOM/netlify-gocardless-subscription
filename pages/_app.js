import React from "react";
import { IdentityContextProvider } from "react-netlify-identity-widget";
import "../styles/globals.css";
import { AppWrapper } from "../context/state";

// If (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
// require("../mocks/");
// }

function Application({ Component, pageProps }) {
  const url = "https://nervous-minsky-4dcffc.netlify.app";
  return (
    <IdentityContextProvider url={url}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </IdentityContextProvider>
  );
}

export default Application;
