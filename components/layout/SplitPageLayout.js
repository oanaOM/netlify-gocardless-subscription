import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import Link from "next/link";

import styled from "@emotion/styled";
import Logo from "../Logo";
import GCFooter from "../GCFooter";
import * as Colors from "../../styles/colors";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const LeftSide = styled.div`
  padding: 64px 64px 40px;
  height: 100%;
  overflow-y: auto;
  background-color: ${Colors.GREEN_LIGHT};
  flex: 0 0 40%;
`;
const RightSide = styled.div`
  background-color: transparent;
  padding: 32px 32px 40px;
  height: 100%;
  overflow-y: auto;
  flex: 0 0 60%;
`;

const SubscriptionDetails = styled.div`
  align-items: top;
`;

const SubscriptionDetailsTitle = styled.h3`
  color: rgba(26, 26, 26, 0.5);
`;

const Subscription = styled.div`
  color: #ffffff;
  font-size: 2rem;
`;

export default function SplitPageLayout({
  leftSideChildren,
  rightSideChildren,
}) {
  return (
    <Container>
      <Main>
        <LeftSide>
          <SubscriptionDetails>
            <div>
              {leftSideChildren}
              <Logo src="happy_dog_face.png" width="35" height="35" />
            </div>
            <SubscriptionDetailsTitle>
              Subscribe to Pro
            </SubscriptionDetailsTitle>
            <Subscription>Subscribe to Pro</Subscription>
            <GCFooter />
          </SubscriptionDetails>
        </LeftSide>
        <RightSide>
          {/* <SubscriptionForm user={full_name} /> */}
          {rightSideChildren}
        </RightSide>
      </Main>
    </Container>
  );
}
