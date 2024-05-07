import React from "react";

const loginContext = React.createContext({
  token: "",
  isExpired: false,
  loginUrl: "",
  logout: () => {},
});

export default loginContext;
