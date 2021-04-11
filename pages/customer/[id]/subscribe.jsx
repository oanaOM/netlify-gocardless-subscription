import React, { useEffect, useState } from "react";
import axios from "axios";

import SplitPageLayout from "@components/layout/SplitPageLayout";
import { useAppState } from "@context/state";
import { Button, FormButtonsHorizontal } from "@components/Library";

import { setRedirectFlowComplete } from "../../../functions/utils/gocardless";
import { useAppReducer } from "@context/state";
import { useRouter } from "next/router";
import { useIdentityContext } from "react-netlify-identity-widget";
import ErrorFallback from "@components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";


export default function Subscribe({ data }) {
  const [newSubs, setNewSubs] = useState();
  const [value, setValue] = useState();

  const dispatch = useAppReducer();
  const date = new Date(Date.now());
  const state = useAppState();
  const router = useRouter();
  const { user } = useIdentityContext();

  useEffect(() => {
    if (!!data) {
      dispatch({
        type: "ADD_LINKS",
        links: data.links,
      });
    }
    setValue(parseInt(state.subs.value.substring(1)) * 100);
  }, [setValue]);

  const handleConfirm = async () => {
    await axios
      .post("/.netlify/functions/post-subscription", {
        amount: value,
        subscription_type: state.subs.category,
        mandate: state.links.mandate,
      })
      .then((res) => {
        setNewSubs(res.data.active);
        router.push({
          pathname: "/customer/[id]/success",
          query: { id: user.id },
        });
      });
  };

  console.log("redirect flow data:", data);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SplitPageLayout
        rightSideChildren={
          <>
            <h1>Confirm your new subscription</h1>
            <h4>{state.subs.category}</h4>
            <hr />
            <p>{state.subs.description}</p>
            <br />
            <br />
            <br />
            <p>What you'll pay monthly starting with </p>
            <p>
              <strong>{date.toDateString()}</strong>
            </p>
            <p>{state.subs.value}</p>
            <hr />
            <p>Amount due today</p>
            <p>{state.subs.value}</p>
            <br />
            <br />
            {newSubs && <div>{newSubs} !!</div>}
            <FormButtonsHorizontal>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button
                type="button"
                variant="info"
                onClick={() =>
                  router.push({
                    pathname: `/customer/[id]/manage`,
                    query: { id: user.id },
                  })
                }
              >
                Cancel
              </Button>
            </FormButtonsHorizontal>
          </>
        }
      ></SplitPageLayout>
    </ErrorBoundary>
  );
}

export async function getServerSideProps(context) {
  const { redirect_flow_id } = context.query;

  const data = await setRedirectFlowComplete(redirect_flow_id);

  const customer = data ? data.links.customer : "";

  console.log(">>>customer: ", customer);
  console.log(">>>data: ", data);

  if (!data) {
    return {
      props: {
        data: "",
      },
    };
  }

  return {
    props: {
      data,
    },
  };
}
