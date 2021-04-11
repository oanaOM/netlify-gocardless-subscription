import React from "react";
import styled from "@emotion/styled";

import SplitPageLayout from "@components/layout/SplitPageLayout";
import Logo from "@components/Logo";
import { useAppState } from "@context/state";
import { Button } from "@components/Library";
import { useRouter } from "next/router";
import { useIdentityContext } from "react-netlify-identity-widget";

export default function Success() {
  const state = useAppState();
  const { user } = useIdentityContext();
  const router = useRouter();

  const Main = styled.div`
    text-align: center;
  `;

  return (
    <SplitPageLayout
      rightSideChildren={
        <Main>
          <h1>Congratulations! </h1>
          <p>You have just been subscribed to</p>
          <h3>{state.subs.category}</h3>
          <Logo src="nerd-doggie.png" width="120" height="120" />
          <br />
          <br />
          <br />
          <Button
            type="button"
            variant="info"
            onClick={() =>
              router.push({
                pathname: "/customer/[id]/manage",
                query: { id: user.id },
              })
            }
          >
            Go back to manage subscriptions
          </Button>
        </Main>
      }
    />
  );
}
