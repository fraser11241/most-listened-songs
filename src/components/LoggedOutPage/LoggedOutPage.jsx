import React from "react";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";

const LoggedOutPage = ({ isTokenExpired }) => {
	return <div>Token expired, please login again.</div>;
};

export default LoggedOutPage;
