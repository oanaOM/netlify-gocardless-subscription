import React, { useContext } from "react";

import Subscription from "../../../components/Subscription";
import Head from "next/head";
import NavBar from "../../../components/Navbar";
import { useEffect } from "react";
import { useIdentityContext, useNetlifyIdentity } from "react-netlify-identity";

const { faunaFetch } = require("../../../functions/utils/fauna");

export default function Customer({ data }) {
  const {user} = useIdentityContext();
  useEffect(() => {
    // TODO: if the customer has any mandate setup redirect him to manage page
    // otherwise redirect him to form page to setup a new mandate
    const { mandateID } = data;
    
  
  }, []);

  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar showBrandLogo={false} />
      <main>
        <h1>Welcome {user.user_metadata.full_name}!</h1>
        <h3>Choose a subscription plan</h3>
        <Subscription customer={user.id} />
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
