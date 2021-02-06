import { IdentityContextProvider } from "react-netlify-identity-widget";

function Application({ Component, pageProps, element }) {
  const url = "https://nervous-minsky-4dcffc.netlify.app"

  return (
    <IdentityContextProvider url={url}>
      <Component {...pageProps} />
    </IdentityContextProvider>
  );
}

export default Application;
