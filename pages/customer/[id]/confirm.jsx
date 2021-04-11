import React, { useEffect } from "react";
import { setRedirectFlowComplete } from "@lib/gocardless";

import {
  Button,
  Form,
  FormInput,
  FormLabel,
} from "@components/Library";

import SplitPageLayout from "@components/layout/SplitPageLayout";
import BackToCustomer from "@components/BackToCustomer";
import { useAppState, useAppReducer } from "@context/state";
import { useIdentityContext } from "react-netlify-identity";


export default function Success({ data }) {
  const state = useAppState();
  const dispatch = useAppReducer();

  const user = useIdentityContext();

  console.log("redirect flow complete: ", data);
  console.log("state: ", state);

  useEffect(() => {
    // update state with customer links info
    dispatch({
      type: "ADD_LINKS",
      links: data.links
    })    
  }, [])


  return (
    <SplitPageLayout
      leftSideChildren={<BackToCustomer full_name={user.id} />}
      rightSideChildren={
        <>
          <h1>Confirm your new subscription plan</h1>
          <hr />
          {/* <h3>{ state }</h3> */}
          <Form onSubmit={() => {}}>
            <FormLabel htmlFor="family_name" isRequired>
              Amount
            </FormLabel>
            <FormInput type="text" id="family_name" value="$10.00" readOnly />
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Form>
        </>
      }
    />
  );
}

export async function getServerSideProps(context) {
  const { redirect_flow_id } = context.query;

  const data = await setRedirectFlowComplete(redirect_flow_id);

  const customer = data ? data.links.customer : "";

  console.log(">>>customer: ", customer);
  console.log(">>>data: ", data);

  return {
    props: {
      data,
    },
  };
}
