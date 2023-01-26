import React, { useState, useEffect } from "react";
import LoggedOutPage from "../LoggedOutPage/LoggedOutPage";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";
import loginContext from "./LoginContext";

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

  const isTokenExpired = (existingTokenExpiry) =>
    existingTokenExpiry && Date.now() / 1000 > existingTokenExpiry;

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const existingTokenExpiry = window.localStorage.getItem("expiry");

    if (existingTokenExpiry && isTokenExpired(existingTokenExpiry)) {
      setIsExpired(true);
      logout();
    } else {
      if (!token && hash) {
        token = hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          .split("=")[1];

        window.location.hash = "";
        window.localStorage.setItem("token", token);

        const expiryTime = Date.now() / 1000 + 3600;
        window.localStorage.setItem("expiry", expiryTime);
      }
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiry");
  };

  const isLoggedIn = token && !isExpired;

  return (
    <loginContext.Provider value={{ token }}>
      <LoginLogoutButton
        isLoggedIn={isLoggedIn}
        loginUrl={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
        handleLogout={logout}
      />

      {isExpired && <LoggedOutPage />}
      {isLoggedIn && children}
    </loginContext.Provider>
  );
};

export default LoginHandler;
