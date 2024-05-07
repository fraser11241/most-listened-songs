import React, { useEffect, useState } from "react";

import SpotifyItem from "components/mostListened/SpotifyItem/SpotifyItem";

const SongsInPlaylistSelection = ({ itemsInPlaylist }) => {
  const [isIncludedInPlaylist, setIsIncludedInPlaylist] = useState(
    itemsInPlaylist?.length ? itemsInPlaylist.map(() => true) : []
  );

  const toggleIsIncludedInPlaylist = (indexToToggle) => {
    setIsIncludedInPlaylist(
      isIncludedInPlaylist.map((isIncluded, index) =>
        index === indexToToggle ? !isIncluded : isIncluded
      )
    );
  };

  const selectAll = () => {
    setIsIncludedInPlaylist(itemsInPlaylist.map(() => true));
  };

  const deselectAll = () => {
    setIsIncludedInPlaylist(itemsInPlaylist.map(() => false));
  };

  useEffect(() => {
    setIsIncludedInPlaylist(
      itemsInPlaylist?.length ? itemsInPlaylist.map(() => true) : []
    );
  }, [itemsInPlaylist]);

  return (
    itemsInPlaylist && (
      <div className="mt-2">
        <div className="flex">
          <p>
            <strong>
              {
                itemsInPlaylist.filter(
                  (_, index) => isIncludedInPlaylist[index]
                ).length
              }
            </strong>{" "}
            songs in playlist
          </p>
          <div className="ml-auto">
            <button
              className="btn btn-outline"
              onClick={selectAll}
              type="button"
              aria-label="Add all songs to selection"
            >
              Select all
            </button>
            <button
              className="btn btn-outline ml-2"
              onClick={deselectAll}
              type="button"
              aria-label="Remove all songs from selection"
            >
              Deselect all
            </button>
          </div>
        </div>

        <ol className="list-none p-0">
          {itemsInPlaylist.map((item, index) => (
            <li
              className="p-0"
              key={`${item.name} ${index} ${itemsInPlaylist.length}`}
            >
              <label>
                <SpotifyItem
                  item={item}
                  isStyledAsDisabled={!isIncludedInPlaylist[index]}
                >
                  <div class="form-control w-40 ml-auto">
                    <label class="cursor-pointer label">
                      <span class="label-text">Include in playlist?</span>
                      <input
                        type="checkbox"
                        name="playlistSong"
                        checked={isIncludedInPlaylist[index] || false}
                        onChange={() => {
                          toggleIsIncludedInPlaylist(index);
                        }}
                        className="toggle toggle-secondary z-50"
                        aria-label={item.name}
                      />
                    </label>
                  </div>
                </SpotifyItem>
              </label>
            </li>
          ))}
        </ol>
      </div>
    )
  );
};

export default SongsInPlaylistSelection;
