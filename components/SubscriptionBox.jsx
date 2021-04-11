import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { Button } from "./Library";
import { useAppReducer } from "../context/state";

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
  customer,
}) {
  const router = useRouter();
  const dispatch = useAppReducer();


  useEffect(() => {
    const value = subscription.split(" ")[0];

    // update state
    dispatch({
      type: "ADD_SUBS",
      subs: {
        category: title,
        value: value,
      },
    });
  }, [])

  const handleSubscription = async (evt) => {
    evt.preventDefault();
    
    // start GC redirect flow
    await axios
    .post("/api/customers", {
      email: customer.email,
    })
    .then((res) => {
        router.push(res.data.redirect_url);
      })
      .catch((err) => {
        alert(err);
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
