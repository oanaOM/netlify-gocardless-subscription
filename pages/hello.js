import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { useAppReducer, useAppState } from "../context/state";

export default function Hello({ data }) {
  const dispatch = useAppReducer();
  const state = useAppState();
  const inputRef = useRef();
  const [subscriptions, setSubscriptions] = useState();

  const router = useRouter();

  const customerID = "CU000FC1FYVME7";
  const flow_id = router.query.redirect_flow_id;

  // console.log(state);

  useEffect(() => {
    // var config = {
    //   headers: { "Access-Control-Allow-Origin": "*" },
    // };
     axios
        .post("/.netlify/functions/complete-redirect-flow", {
           redirect_flow_id: flow_id,
         })
        .then((res) => {
          setSubscriptions(res.data);
          // store the first subscription just to use the mandate ID
          dispatch({
            type: "ADD_GC_SUBS",
            subs: res.data[0].links,
          });
        })
        .catch((err) => console.error(err));
    console.log("manage page: ", router.query);
  }, [])

  // const addSubs = (e) => {
  //   e.preventDefault();

  //   const newSubs = inputRef.current.value;
  //   const newLinks = {
  //         creditor: "CR000065KH231F",
  //         customer: "CU000F9XNM5SJF",
  //         customer_bank_account: "BA000ERWR385P3",
  //         mandate: "MD000EVEBW04JT"
  //       }

  //   if (!!newSubs.trim()) {
  //     dispatch({
  //       type: "ADD_SUBS",
  //       subs: newSubs,
  //     });
  //   }
  //   inputRef.current.value = "";
  // };
  // console.log(state);

  return (
    <>
      <div>Hello</div>
      {subscriptions?.length}
      {/* <ul>
        {subscriptions?.map(subscription => {
        return <p key={subscription.id}>!!!{subscription.id}</p>;
        })}
      </ul> */}
      <form onSubmit={() => {}}>
        <input ref={inputRef} placeholder="Add new subs" autoFocus />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
