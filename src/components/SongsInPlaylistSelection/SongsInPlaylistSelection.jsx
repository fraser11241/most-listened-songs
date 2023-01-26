import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./SongsInPlaylistSelection.scss";

const SongsInPlaylistSelection = ({
  toggleIsIncludedInPlaylist,
  itemsInPlaylist,
  deselectAll,
  selectAll,
}) => {
  return (
    itemsInPlaylist && (
      <>
        <button
          className="button is-small mb-1 deselect-all-button"
          onClick={selectAll}
          type="button"
        >
          Select all
        </button>
        <button
          className="button is-small mb-1 deselect-all-button"
          onClick={deselectAll}
          type="button"
        >
          Deselect all
        </button>

        <ol className="songs-in-playlist-selection">
          {itemsInPlaylist.map(({ item, isIncludedInPlaylist }, index) => (
            <li>
              <label
                className={`spotify-item-checkbox-container ${
                  isIncludedInPlaylist ? "included" : "not-included"
                }`}
              >
                <SpotifyItem item={item}>
                  <ToggleSwitch
                    checked={isIncludedInPlaylist}
                    onChange={() => toggleIsIncludedInPlaylist(index)}
                  />
                </SpotifyItem>
              </label>
            </li>
          ))}
        </ol>
      </>
    )
  );
};

export default SongsInPlaylistSelection;
