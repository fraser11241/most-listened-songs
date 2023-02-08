import { Button, Fab } from "@mui/material";
import React from "react";

import './LoginLogoutButton.scss';

const LoginLogoutButton = ({ isLoggedIn, loginUrl, handleLogout }) => {
  return isLoggedIn ? (
    <div className="logout-button-container">

    <Fab
      className="logout-button"
      size="small"
      variant="extended"
      onClick={handleLogout}
    >
      Logout of spotify
    </Fab>
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
