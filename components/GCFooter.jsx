import React from "react";
import styled from "@emotion/styled";

export default function FooterGC() {
  const SubscriptionDetailsFooter = styled.footer`
    position: absolute;
    bottom: 0;
    margin: 32px 0;
    font-size: 0.75rem;
    color: rgba(26, 26, 26, 0.5);
  `;

  return (
    <>
      <SubscriptionDetailsFooter>
        Powered by <strong>GoCardless</strong>
      </SubscriptionDetailsFooter>
    </>
  );
}
