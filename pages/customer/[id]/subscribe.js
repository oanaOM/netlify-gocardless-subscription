import React from "react";
import { useIdentityContext } from "react-netlify-identity-widget";

import SubscriptionForm from "../../../components/SubscriptionForm";
import SplitPageLayout from "../../../components/layout/SplitPageLayout";
import BackToCustomer from "../../../components/BackToCustomer";

export default function Subscribe() {
  const { user } = useIdentityContext();
  // const { full_name } = user.user_metadata ? user.user_metadata : "";
  const { full_name } = "om";

  return (
    <SplitPageLayout
      leftSideChildren={
        <BackToCustomer full_name={ full_name }/>
      }
      rightSideChildren={
        <SubscriptionForm user={full_name} />
      }
    />
  );
}



