import React, { useState, useEffect } from "react";
import LoginPage from "../LoginPage/LoginPage";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";
import loginContext from "./LoginContext";
import TokenExpiredPage from "../TokenExpiredPage/TokenExpiredPage";

const LoginHandler = ({ children }) => {
	const [token, setToken] = useState("");
	const [isExpired, setIsExpired] = useState(false);

	const CLIENT_ID = "9140a43db1f0411aa6a5255f3e333b18";
	const REDIRECT_URI =
		window.location.href && window.location.href.includes("localhost")
			? "http://localhost:3000/spotify-most-listened"
			: "https://fraser11241.github.io/spotify-most-listened/";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE =
		"user-top-read user-read-recently-played user-read-playback-state playlist-modify-public playlist-modify-private";
	const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

	const checkTokenExpired = (existingTokenExpiry) =>
		existingTokenExpiry && Date.now() / 1000 > existingTokenExpiry;

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");
		const existingTokenExpiry = window.localStorage.getItem("expiry");

		if (existingTokenExpiry && checkTokenExpired(existingTokenExpiry)) {
			setIsExpired(true);
			logout();
		} else {
			const tokenDurationSeconds = 3600;

			let expiryTime = existingTokenExpiry;
			if (!token && hash) {
				token = hash
					.substring(1)
					.split("&")
					.find((elem) => elem.startsWith("access_token"))
					.split("=")[1];

				window.location.hash = "";
				window.localStorage.setItem("token", token);

				expiryTime = Date.now() / 1000 + tokenDurationSeconds;
				window.localStorage.setItem("expiry", expiryTime);
			}
			setToken(token);
			if (expiryTime) {
				const expiryTimer = setTimeout(() => {
					setIsExpired(true);
				}, tokenDurationSeconds * 1000);
				return () => clearTimeout(expiryTimer);
			}
		}
	}, []);

	const logout = () => {
		setToken("");
		setIsExpired(false);
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("expiry");
	};

	const isLoggedIn = token && !isExpired;

	return (
		<loginContext.Provider value={{ token, isExpired, loginUrl }}>
			{!isLoggedIn && (
				<LoginPage isTokenExpired={isExpired} loginUrl={loginUrl} />
			)}
			{isLoggedIn && (
				<>
					<LoginLogoutButton
						isLoggedIn={isLoggedIn}
						loginUrl={loginUrl}
						handleLogout={logout}
					/>
					{children}
				</>
			)}
		</loginContext.Provider>
	);
};

export default LoginHandler;
