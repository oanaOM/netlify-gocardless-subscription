import { IdentityContextProvider } from "react-netlify-identity-widget";

function Application({ Component, pageProps }) {
  return (
    <IdentityContextProvider>
      <Component {...pageProps} />
    </IdentityContextProvider>
  );
}

export default Application;
