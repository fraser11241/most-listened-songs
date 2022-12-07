import React from "react";
import EmptyIndicator from "../EmptyIndicator/EmptyIndicator";

import SpotifyItemList from "../SpotifyItemList/SpotifyItemList";

import "./SpotifyItemListPanel.scss";

const SpotifyItemListPanel = ({ items, title, createPlaylist }) => {
    return (
        <div>
            <ol className="spotify-item-list">
                {title && <h2 className="title is-2">{title}</h2>}

                {items ? 
                    <SpotifyItemList items={items} createPlaylist={createPlaylist} />
                 : 
                    <EmptyIndicator />
                }
            </ol>
        </div>
    );
};

export default SpotifyItemListPanel;
