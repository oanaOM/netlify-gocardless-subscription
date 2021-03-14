import React from "react";

import Subscription from "../../components/Subscription";
import Head from "next/head";
import NavBar from "../../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Customer() {
  const [customer, setCustomer] = useState();

  const router = useRouter();

  useEffect(() => {
    setCustomer(router.query.id);
    // axios.get("/customers").then((res)=>{console.log(res.data)});
    console.log("Get");
  }, []);
  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar showBrandLogo={false} />
      <main>
        <h1>Welcome {customer}!</h1>
        <h3>Choose a subscription plan</h3>
        <Subscription />
      </main>
    </>
  );
}
