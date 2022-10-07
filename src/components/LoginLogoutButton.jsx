import React from "react";
import Button from "@mui/material/Button";

const LoginLogoutButton = ({ isLoggedIn, loginUrl, handleLogout }) => {
	return isLoggedIn ? (
		<Button
			component={"a"}
			href={loginUrl}
			variant="contained"
			sx={{
				position: "absolute",
				top: "10px",
				right: "10px",
			}}
		>
			Login to Spotify
		</Button>
	) : (
		<Button
			sx={{
				position: "absolute",
				top: "10px",
				right: "10px",
			}}
			variant="contained"
			onClick={handleLogout}
			color="success"
		>
			Logout of spotify
		</Button>
	);
};

export default LoginLogoutButton;
