import React, { createContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const MockAuthContext = ({ authState, children }) => {
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

MockAuthContext.propTypes = {
  authState: PropTypes.any,
  children: PropTypes.any
}
