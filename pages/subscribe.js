import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import { useRouter } from "next/router";
import Link from "next/link";
import { useIdentityContext } from "react-netlify-identity-widget";

import styled from "@emotion/styled";
import Logo from "../components/Logo";
import SubscriptionForm from "../components/SubscriptionForm";
import GCFooter from "../components/GCFooter";
import * as Colors from "../styles/colors";

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


export default function Subscribe() {
  const { user } = useIdentityContext();
  const { full_name } = user.user_metadata;

  console.log(user);
  return (
    <Container>
      <Main>
        <LeftSide>
          <SubscriptionDetails>
            <div>
              <Link href={{
                "pathname": `/customer/${full_name}`
              }} passHref>
                <FaArrowLeft />
              </Link>
              <Logo src="happy_dog_face.png" width="35" height="35" />
            </div>
            <SubscriptionDetailsTitle>
              Subscribe to Pro
            </SubscriptionDetailsTitle>
            <Subscription>Subscribe to Pro</Subscription>
            <GCFooter/>
          </SubscriptionDetails>
        </LeftSide>
        <RightSide>
          <SubscriptionForm user={full_name}/>
        </RightSide>
      </Main>
    </Container>
  );
}
