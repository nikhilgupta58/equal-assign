
import React from "react";

export const LoginContext = React.createContext(null);

export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  if (!context)
    throw new Error("useLoginContext can not be used outside it's provider");
  return context;
};
