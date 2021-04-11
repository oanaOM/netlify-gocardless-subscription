import React from "react";

import { useState } from "react";
import Head from "next/head";
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import { useEffect } from "react";

import { Button, FormButtons } from "@components/Library";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppReducer } from "@context/state";
import Subscriptions from "@components/Subscription";

export default function Home() {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const dispatch = useAppReducer();

  const router = useRouter();

  useEffect(async () => {
    if (identity) {
      identity.logoutUser();
      localStorage.removeItem("state");
    }
  }, []);

  const handleLogin = (user) => {
    // check if the user is already a GC customer
    axios
      .get("/api/customers")
      .then((res) => {
        const gcCustomer = res.data.customers.filter(
          (customer) => customer.email === user.email
        )[0];

        // if a GC customer: Store his details
        if (gcCustomer) {
          dispatch({
            type: "ADD_CUSTOMER",
            customer: gcCustomer,
          });
        }

        // redirect him to the subscription manage page
        router.push({
          pathname: "/customer/[id]/manage",
          query: { id: user.id },
        });
        // redirectCustomer(user.id, gcCustomer);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="header">
        {!identity.isLoggedIn && (
          <>
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
              <Button onClick={() => setDialog(true)}>Sign up</Button>
            </FormButtons>
            <Subscriptions />
          </>
        )}
        {/* <Footer/> */}
      </main>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={handleLogin}
        onSignup={(user) => console.log("welcome ", user?.user_metadata)}
        onLogout={() => console.log("bye ")}
      />
    </>
  );
}
