import React, { createContext, useContext, useReducer } from "react";
import { saveState, loadState } from "./local-storage";

const AppContext = createContext();

// useContext() hook returns and array of [state, dispatch]
export function useAppState() {
  return useContext(AppContext)[0];
}

export function useAppReducer() {
  return useContext(AppContext)[1];
}

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SUBS": {
      const newState = { ...state, subs: action.subs };
      saveState(newState);
      return newState;
    }
    case "ADD_REDIRECT_FLOW_URL": {
      const newState = {
        ...state,
        redirect_flow_url: action.redirect_flow_url,
      };
      saveState(newState);
      return newState;
    }
    case "ADD_LINKS": {
      const newState = { ...state, links: action.links };
      saveState(newState);
      return newState;
    }
    case "ADD_LINK_MANDATE": {
      const mandate = {
        mandate: action.links
      }
      const newState = { ...state, links: mandate };
      saveState(newState);
      return newState;
    }
    case "ADD_CUSTOMER": {
      const newState = { ...state, customer: action.customer };
      saveState(newState);
      return newState;
    }
    case "ADD_GC_SUBS": {
      const newState = { ...state, links: action.subs };
      saveState(newState);
      return newState;
    }
    default:
      return state;
  }
};

export function AppStateProvider({ children }) {
  // load state from local storage if exists
  let initialState = loadState();

  if (initialState === undefined) {
    initialState = {
      email: "",
      links: {},
      subs: {},
      redirect_flow_url: "",
      customer: {},
    };
  }

  saveState(initialState);

  const sharedState = useReducer(appStateReducer, initialState);

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
