import React, { useState } from "react";
import styled from "@emotion/styled";
import * as Colors from "../styles/colors";
import { Spinner } from "@components/Library";
import { Button } from "./Library";
import axios from "axios";

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

const Row = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.GREYISH};
`;

export default function ManageSubscriptions({ subscriptions, loading }) {
  const handleDeleteSubscription = async (subscription_id) => {
    console.log(subscription_id);
    await axios
      .post("/.netlify/functions/cancel-subscription", {
        id: subscription_id,
      })
      .then((res) => {
        alert(`Subscription ${res.data.name} of value ${res.data.amount} has been ${res.data.status}`);
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
      });
  };

  return (
    <>
      {loading && (
        <div className="container">
          <Spinner />
        </div>
      )}
      {subscriptions?.length > 0 && (
        <div>
          {subscriptions.map((subscription, index) => {
            const date = new Date(subscription.created_at).toLocaleDateString(
              "en-gb",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <Row key={index}>
                <div>
                  {subscription.name} created on: {date}
                </div>
                <div>
                  {formatter.format(subscription.amount / 100)}
                  {subscription.currency}
                </div>
                {subscription.status === "cancelled" && <div>Cancelled</div>}
                {subscription.status !== "cancelled" &&
                  
                <Button
                variant="danger"
                onClick={() => handleDeleteSubscription(subscription.id)}
                >
                  Cancel
                </Button>
                }
              </Row>
            );
          })}
        </div>
      )}
    </>
  );
}
