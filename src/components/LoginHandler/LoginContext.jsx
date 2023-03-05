import React from "react";

const loginContext = React.createContext({
	token: "",
	isExpired: false,
	loginUrl: "",
});

export default loginContext;
