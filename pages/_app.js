import React from "react";
import { IdentityContextProvider } from "react-netlify-identity-widget";
import "../styles/globals.css";
import { AppStateProvider } from "../context/state";

// If (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
// require("../mocks/");
// }

function Application({ Component, pageProps }) {
  const url = "https://nervous-minsky-4dcffc.netlify.app";
  return (
    <IdentityContextProvider url={url}>
      <AppStateProvider>
        <Component {...pageProps} />
      </AppStateProvider>
    </IdentityContextProvider>
  );
}

export default Application;
