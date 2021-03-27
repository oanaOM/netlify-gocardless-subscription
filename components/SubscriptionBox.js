import React, { useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { Button } from "./Library";

const Box = styled.section`
  border: 1px solid #9ad9c7;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 28px;
  max-width: 300px;
  height: 400px;
  margin: 25px;
  text-align: center;
`;

export default function SubscriptionBox({
  title,
  description,
  subscription,
  imgSRC,
  customer
}) {
  const router = useRouter();
  const handleSubscription = (evt) => {
    evt.preventDefault();
    const subscriptionType = evt.target.innerText;
    localStorage.setItem("subscription", subscriptionType);

    router.push({
      "pathname": `/customer/${customer}/subscribe`,
    });
  };

  return (
    <Box>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={`/${imgSRC}`} width="50%" height="auto" />
      <Button onClick={handleSubscription}>{subscription}</Button>
    </Box>
  );
}
