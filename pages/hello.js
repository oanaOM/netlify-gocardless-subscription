import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useAppReducer, useAppState } from "../context/state";

export default function Hello({ data }) {
  const dispatch = useAppReducer();
  const state = useAppState();
  const inputRef = useRef();
  const [subscriptions, setSubscriptions] = useState();

  const customerID = "CU000FADM5P0NM";

  // console.log(state);

  useEffect(() => {
    axios
      .get(`/api/mandates`)
      .then((res) => {
        console.log("res ", res.data);
        // console.log("res ", response,len);
      })
      .catch((err) => console.error(err));
    console.log("manage page: ", customerID);
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
      <ul>
        {subscriptions?.map(subscription => {
        return <p key={subscription.id}>!!!{subscription.id}</p>;
        })}
      </ul>
      <form onSubmit={() => {}}>
        <input ref={inputRef} placeholder="Add new subs" autoFocus />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
