import React from "react";

const LoginLogoutButton = ({ isLoggedIn, loginUrl, handleLogout }) => {
	return isLoggedIn ? (
		<a
			style={{
				position: "absolute",
				top: "10px",
				right: "10px",
			}}
			href={loginUrl}
		>
			Login to Spotify
		</a>
	) : (
		<button
			style={{
				position: "absolute",
				top: "10px",
				right: "10px",
			}}
			onClick={handleLogout}
		>
			Logout of spotify
		</button>
	);
};

export default LoginLogoutButton;
