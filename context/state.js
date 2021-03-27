import { createContext, useContext } from 'react';
import { useIdentityContext } from "react-netlify-identity-widget";

const AppContext = createContext();

export function AppWrapper({ children }){
    let sharedState = useIdentityContext();

    return (
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}