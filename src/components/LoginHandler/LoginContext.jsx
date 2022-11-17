import React from "react";

const loginContext = React.createContext({ isLoggedIn: false, token: "" });

export default loginContext;
