import React from "react";

import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import Box from "./SubscriptionBox";


export default function Subscriptions({ customer }) {
  console.log(customer);
  return (

    <>
      {/* <header className="header">
        <Logo width="50" height="50" />
        <h1>Sign up for premium meal deal for dogs</h1>
      </header> */}
      <main className="container" >
       
        <Box
          customer={customer}
          title="Basic Subscription"
          description="Fresh dog meal for your best friend"
          subscription="$10 per month"
          imgSRC="pizza_doggie.png"
        />
        <Box
          customer={customer}
          title="Pro Subscription"
          description="Fresh dog meals + treats"
          subscription="$15 per month"
          imgSRC="happy_dog_face.png"
        />
      </main>
    </>
  );
}
