import React from "react";

const LoginLogoutButton = ({ isLoggedIn, loginUrl, handleLogout }) => {
	return isLoggedIn ? (
		<div>
			<button
				onClick={handleLogout}
			>
				Logout of spotify
			</button>
		</div>
	) : (
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
	);
};

export default LoginLogoutButton;
