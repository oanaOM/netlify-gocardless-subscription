import React from 'react'
import { IdentityContextProvider } from "react-netlify-identity-widget";

export const AppWrapper = ( children ) => {
    return (
      <IdentityContextProvider>
        {children}
      </IdentityContextProvider>
    );
  }