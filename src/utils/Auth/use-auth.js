import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { useProvideAuth } from './auth-provider';

const authContext = createContext();
export function AuthProvider({ children }) {
  const { isLoading, error, data } = useProvideAuth();
  return <authContext.Provider value={{ isLoading, error, data }}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export const useAuth = () => {
  return useContext(authContext);
};
