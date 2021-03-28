import React from "react";

import { useState } from "react";
import Head from "next/head";
import {
  IdentityModal,
  useIdentityContext
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import { useEffect } from "react";


import Logo from "../components/Logo";
import { Button, FormButtons } from "../components/Library";
import { useRouter } from "next/router";


export default function Home() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const router = useRouter();

  useEffect(async () => {
    
    if (identity) {
      // hacky workaround: if the user is already logged in and lands back on this page, log him out
      identity.logoutUser();
      // TODO: re-auth the user if token exists
      // identity
      //   .getFreshJWT(identity.user.token.access_token)
      //   .then((jwt) => setAccessToken(jwt));

      // const { roles } = identity.user.app_metadata;
      // setRoles(roles);
    }

  }, []);

  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="header">
        {!identity.isLoggedIn && (
          <>
            <Logo src="nerd-doggie.png" width="120" height="120" />
            <h1>Happy Paws</h1>
            <p>Fresh homemade food prepared for your dog. Vet approved.</p>
          </>
        )}
      </header>
      <main className="container">
        {!dialog && !identity.isLoggedIn && (
          <>
            <FormButtons>
              <Button onClick={() => setDialog(true)}>Log in</Button>
              {/* <Button onClick={onLoginButton}>Log in</Button> */}
              <Button onClick={() => setDialog(true)}>Sign up</Button>
            </FormButtons>
          </>
        )}
        {/* <Footer/> */}
      </main>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={(user) => router.push({
          "pathname": "/customer/[id]",
          "query": { "id": user.id }
        })}
        onSignup={(user) => console.log("welcome ", user?.user_metadata)}
        onLogout={() => console.log("bye ")}
      />
    </>
  );
}
