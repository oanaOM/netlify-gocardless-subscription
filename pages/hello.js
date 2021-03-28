import React, { useRef } from "react";

import { useAppReducer, useAppState } from "../context/state";

export default function Hello({ data }) {
  const dispatch = useAppReducer();
  const state = useAppState();
  const inputRef = useRef();

  console.log(state);

  const addSubs = (e) => {
    const newSubs = inputRef.current.value;

    if (!!newSubs.trim()) {
      dispatch({ type: "ADD_SUBS", subs: newSubs });
    }
    e.preventDefault();
    inputRef.current.value = "";
  };
  console.log(state)

  return (
    <>
      <div>Hello</div>
      <form onSubmit={addSubs}>
        <input ref={inputRef} placeholder="Add new subs" autoFocus />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
