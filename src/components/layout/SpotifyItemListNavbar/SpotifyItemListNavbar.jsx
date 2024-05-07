import React from "react";

import { SpotifyItemTypes } from "config/enums";

const SpotifyItemListNavbar = ({
  currentItemType,
  setCurrentItemType,
  handleLogout,
}) => {
  const navbarContent = {
    [SpotifyItemTypes.ARTIST]: "Artists",
    [SpotifyItemTypes.TOP_TRACK]: "Tracks",
    [SpotifyItemTypes.RECENT_TRACK]: "Recent",
  };

  return (
    <div className="bg-primary bg-opacity-75 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center shadow-sm">
      <div className="navbar">
        <span className="navbar-start" />
        <div className="navbar-center">
          <div role="tablist" className={`tabs tabs-bordered `}>
            {Object.entries(navbarContent).map(([value, text], index) => (
              <button
                key={index}
                className={`tab text-xl text-primary-content ${
                  +value === +currentItemType ? "tab-active font-bold" : ""
                }`}
                role="tab"
                onClick={() => setCurrentItemType(+value)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyItemListNavbar;
