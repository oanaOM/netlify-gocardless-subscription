import React, { createContext, useContext, useReducer } from "react";
import { saveState, loadState } from './local-storage';

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
    case "ADD_SUBS":
      // if (state.subs.includes(action.subs)) {
      //   const newSubs = { ...state };
      //   return newSubs;
      // } else {
      //   const newSubs = { ...state, subs: state.subs.concat(action.subs) };
      //   return newSubs;
      // }
      const newSubs = { ...state, subs: action.subs };
      return newSubs;
    default:
      return state;
  }
 }

export function AppStateProvider({ children }) {

  // load state from local storage if exists
  let initialState = loadState();

  if (initialState === undefined) {
    initialState = {
      gocardlessUser: {
        email: '',
        links: {
          customer: '',
          mandate: ''
        }
      },
      subs: ""
    }
  }

  saveState(initialState)


  const sharedState = useReducer(appStateReducer, initialState)

  return (
    <AppContext.Provider value={ sharedState }>{ children }</AppContext.Provider>
  )
}

// export function AppWrapper({ children }){
//     let sharedState = useIdentityContext();

//     return (
//       <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
//     );
// }


// export function useAppContext() {
//   console.log(AppContext);
//     return useContext(AppContext);
// }