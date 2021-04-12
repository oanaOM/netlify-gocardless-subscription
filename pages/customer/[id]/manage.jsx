import axios from "axios";
import React, { useEffect, useState } from "react";

import SplitPageLayout from "@components/layout/SplitPageLayout";
import SubscriptionOption from "@components/SubscriptionOption";
import ManageSubscriptions from "@components/ManageSubscriptions";
import Logout from "@components/Logout";
import { useAppState, useAppReducer } from "@context/state";

import { subscriptionsCategories } from "@context/mock/data";

export default function Manage() {
  const state = useAppState();
  const dispatch = useAppReducer();
  const [subscriptions, setSubscriptions] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const customerID = state.customer.id;
  console.log(customerID);

  useEffect(async () => {
    // if customer already exists, check if he has any subscriptions
    if (state.customer.id) {
      setIsLoading(true);
      await axios
        .get(`/.netlify/functions/get-subscriptions?id=${customerID}`)
        .then((res) => {
          setSubscriptions(res.data);
          console.log("subscs", res.data);
          // store the first subscription just to use the mandate ID
          dispatch({
            type: "ADD_GC_SUBS",
            subs: res.data[0].links,
          });
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [setSubscriptions]);

  return (
    <>
      <SplitPageLayout
        leftSideChildren={<Logout />}
        rightSideChildren={
          <>
            <h1>Manage subscriptions</h1>
            <h4>Current subscriptions</h4>
            <hr />
            <ManageSubscriptions
              subscriptions={subscriptions}
              loading={isLoading}
            />
            {!subscriptions && <p>No subscriptions yet</p>}
            <br />
            <br />
            <br />
            <h4>Add new subscription</h4>
            <hr />
            <div>
              {subscriptionsCategories.map((subscription, index) => {
                return (
                  <SubscriptionOption
                    key={index}
                    title={subscription.category}
                    description={subscription.description}
                    value={subscription.value}
                    img={subscription.image}
                  />
                );
              })}
            </div>
          </>
        }
      />
    </>
  );
}
