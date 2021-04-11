import React, { useEffect, useState } from "react";

import Subscription from "@components/Subscription";
import Head from "next/head";
import NavBar from "@components/Navbar";
import { useIdentityContext } from "react-netlify-identity";

const { faunaFetch } = require("@functions/utils/fauna");

export default function Customer({ data }) {
  const { user } = useIdentityContext();
  const [fullname, setFullName] = useState();

  useEffect(() => {
    setFullName(user.user_metadata.full_name);
  },[])
    
  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar showBrandLogo={false} />
      <main>
        <h1>Welcome {fullname}!</h1>
        <h3>Choose a subscription plan</h3>
        <Subscription customer={user} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {

  const userID = context.params.id;

  const response = await faunaFetch({
    query: `
      query($netlifyID: ID!) {
        getUserByNeltifyID(netlifyID: $netlifyID) {
          _id
          netlifyID
          gocardlessID
          mandateID
        }
      }
    `,
    variables: {
      netlifyID: userID,
    },
  });

  const { data } = response;

  console.log("dbUser", data);

  return {
    props: {
      data: data.getUserByNeltifyID,
    },
  };
}
