import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./SongsInPlaylistSelection.scss";

const SongsInPlaylistSelection = ({
    toggleIsIncludedInPlaylist,
    itemsInPlaylist,
}) => {
    return (
        itemsInPlaylist && (
            <ol className="songs-in-playlist-selection">
                {itemsInPlaylist.map(({ item, isIncludedInPlaylist }, index) => (
                    <li>
                        <label className={`spotify-item-checkbox-container ${isIncludedInPlaylist ? 'included' : 'not-included'}`}>
                            <SpotifyItem item={item}>
                                <ToggleSwitch checked={isIncludedInPlaylist} onChange={() => toggleIsIncludedInPlaylist(index)} />    
                            </SpotifyItem>
                        </label>
                    </li>
                ))}
            </ol>
        )
    );
};

export default SongsInPlaylistSelection;
