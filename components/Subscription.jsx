import React from "react";

import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import Box from "./SubscriptionBox";
import styled from "@emotion/styled";
import { subscriptionsCategories } from "@context/mock/data";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-top: 2rem;
  column-gap: 25px;
`;

const MainBox = styled.div`
  border-radius: 6px;
  border: 1px solid #9ad9c7;
  max-width: 200px;
  padding: 1rem;
`;

export default function Subscriptions() {
  return (
    <>
      <Main>
        {subscriptionsCategories.map((element, index) => {
          return (
            <MainBox key={index}>
              <h2>{element.category}</h2>
              <img src={`/${element.image}`} width="80px" height="auto" />
              <p>{element.description}</p>
              <p>{element.value}</p>
            </MainBox>
          );
        })}
      </Main>
    </>
  );
}
