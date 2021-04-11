import React from "react";
import styled from "@emotion/styled";
import * as Colors from "../styles/colors";
import { Spinner } from "@components/Library";


export default function ManageSubscriptions({ subscriptions, loading }) {


  const Row = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid ${Colors.GREYISH};
  `;

  return (
    <>
      {loading &&
        <div className="container">
        
        <Spinner />
        </div>
      }
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
                  {subscription.amount}
                  {subscription.currency}
                </div>
              </Row>
            );
          })}
        </div>
      )}
    </>
  );
}
