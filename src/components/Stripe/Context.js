import React, { useReducer } from "react";

import reducer, { initialState } from "./reducer";

const StripeContext = React.createContext(initialState);

StripeContext.displayName = "StripeContext";

export default StripeContext;

export function StripeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StripeContext.Provider value={[state, dispatch]}>
      {children}
    </StripeContext.Provider>
  );
}
