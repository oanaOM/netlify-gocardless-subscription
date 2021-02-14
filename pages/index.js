import { useState } from "react";
import Head from "next/head";
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import { useEffect } from "react";
import Subscriptions from "../components/Subscriptions";

import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import { Button, FormButtons } from "../components/Library";
import { useRouter } from "next/router";

export default function Home() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const router = useRouter();
  
    const getCustomer = () =>{
      fetch('/.netlify/functions/get-customer', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
        },
      })
      .then((res)=>res.json())
      .catch((err)=>console.error(err))
    }

  useEffect(async () => {
    if (!identity) {
      identity
        .getFreshJWT(identity.user.token.access_token)
        .then((jwt) => setAccessToken(jwt));

      const { roles } = identity.user.app_metadata;
      setRoles(roles);

      console.log("AICI");
      getCustomer();
    }
  }, []);

  const onLoginButton = () => {
    
  };

  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {identity && identity.isLoggedIn && <NavBar showBrandLogo={false} />}
      <header className="header">
        {!identity.isLoggedIn && (
          <>
            <Logo src="nerd-doggie.png" width="120" height="120" />
            <h1>Happy Paws</h1>
            <p>Fresh homemade food prepared for your dog. Vet approved.</p>
          </>
        )}
        {identity && identity.isLoggedIn && (
          <>
            <h1>Choose a subscription plan</h1>
            <Subscriptions />
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
        onLogin={(user) => console.log("hello ", user?.user_metadata)}
        onSignup={(user) => console.log("welcome ", user?.user_metadata)}
        onLogout={() => console.log("bye ")}
      />
    </>
  );
}
