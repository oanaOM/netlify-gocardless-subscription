import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useIdentityContext } from "react-netlify-identity";
import styled from "@emotion/styled";
import { Button } from "./Library";
import { useAppReducer, useAppState } from "@context/state";

const Box = styled.div`
  border-bottom: 1px solid #9ad9c7;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`;

export default function SubscriptionOption({
  title,
  description,
  value,
  img,
  subscribe,
}) {
  const { user } = useIdentityContext();
  const router = useRouter();
  const dispatch = useAppReducer();

  const state = useAppState();
  let customer_mandate = [];
  const customerID = state.customer.id;

  const handleSubscribe = async () => {
    dispatch({
      type: "ADD_SUBS",
      subs: {
        category: title,
        description: description,
        value: value,
      },
    });

    // if NOT a GC customer start GC redirect flow
    if (!state.customer.id) {
      await axios
        .post("/.netlify/functions/post-customer", {
          email: user.email,
          netlifyID: user.id,
        })
        .then((res) => {
          // update state with subscription chosen
          router.push(res.data.redirect_url);
        })
        .catch((err) => {
          console.log(err);
          console.error(err);
        });
    } else {
      // customer is already signed in so we have an mandate
      // query for the customer mandate and store it!
      await axios
        .get("/.netlify/functions/get-mandates")
        .then((res) => {
          const mandates = res.data;
          customer_mandate = mandates.filter(
            (mandate) => mandate.links.customer === customerID
          );
        })
        .catch((err) => console.error(err));

      dispatch({
        type: "ADD_LINK_MANDATE",
        links: customer_mandate[0].id,
      });
      router.push({
        pathname: "/customer/[id]/subscribe",
        query: { id: user.id },
      });
    }
  };

  return (
    <Box>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
        <p>{value}</p>
      </div>
      <Button onClick={handleSubscribe}>Continue</Button>
    </Box>
  );
}
