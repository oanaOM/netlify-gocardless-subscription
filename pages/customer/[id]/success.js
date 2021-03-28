import React from "react";
import { setRedirectFlowComplete } from "../../../lib/gocardless";

import {
  Button,
  Form,
  FormInput,
  FormLabel,
} from "../../../components/Library";

import SplitPageLayout from "../../../components/layout/SplitPageLayout";
import BackToCustomer from "../../../components/BackToCustomer";
import { faunaFetch } from "../../../functions/utils/fauna";

export default function Success({ data }) {
  console.log("redirect flow complete: ", data);
  return (
    <SplitPageLayout
      leftSideChildren={<BackToCustomer full_name={"om"} />}
      rightSideChildren={
        <>
          <h1>Subscription summary</h1>
          <h3>CURRENT PLAN</h3>
          <hr />
          <h3>Basic Subscription</h3>
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

  const mandate = data.links.mandate;
  const customer = data.links.customer;

  console.log(">>>customer: ", customerID);
  console.log(">>>data: ", data);

  // TODO: update DB with mandate ID

  // const updateMandateResponse = await faunaFetch({
  //   query: `
  //   mutation($netlifyID: ID!, $gocardlessID: ID!, $mandateID: String) {
  //     updateUser(id: 294308553910387207 data: {netlifyID: $netlifyID gocardlessID: $gocardlessID mandateID: $mandateID}) {
  //       _id
  //       mandateID
  //       gocardlessID
  //       netlifyID
  //     }
  //   }
  //   `,
  //   variables: {
  //     netlifyID: 345,
  //     gocardlessID: customer,
  //     mandateID: mandate,
  //   },
  // });


  return {
    props: {
      data,
    },
  };
}
