import React from "react";

import "./Navbar.scss";

import { SpotifyItemTypes, TimeRanges } from "../../enums/enums";

const Navbar = ({
  currentItemType,
  setCurrentItemType,
  currentTimeRange,
  setCurrentTimeRange,
}) => {
  const itemTypeText = {
    [SpotifyItemTypes.RECENT_TRACK]: "Recent tracks",
    [SpotifyItemTypes.ARTIST]: "Top artists",
    [SpotifyItemTypes.TOP_TRACK]: "Top tracks",
  };
  const timeRangeText = {
    [TimeRanges.SHORT_TERM]: "Past month",
    [TimeRanges.MEDIUM_TERM]: "Past 6 months",
    [TimeRanges.LONG_TERM]: "Long term",
  };

  return (
    <aside className="menu sidebar">
      <p className="menu-label has-text-centered is-size-6 mb-0">Label here</p>
      <ul className="menu-list">
        {Object.values(SpotifyItemTypes).map((itemType) => (
          <li>
            <button
              className={`button ${
                itemType === currentItemType ? "is-current" : ""
              }`}
              onClick={() => setCurrentItemType(itemType)}
            >
              {itemTypeText[itemType]}
            </button>
          </li>
        ))}
      </ul>

      <p className="menu-label has-text-centered is-size-6 mb-0">Time range</p>
      <ul className="menu-list">
        {Object.values(TimeRanges).map((timeRange) => (
          <li>
            <button
              className={`button ${
                timeRange === currentTimeRange ? "is-current" : ""
              }`}
              onClick={() => setCurrentTimeRange(timeRange)}
            >
              {timeRangeText[timeRange]}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navbar;
