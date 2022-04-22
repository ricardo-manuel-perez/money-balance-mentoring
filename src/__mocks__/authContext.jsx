import React, { createContext } from "react";

const AuthContext = createContext();

export const MockAuthContext = ({ authState, children }) => {
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
