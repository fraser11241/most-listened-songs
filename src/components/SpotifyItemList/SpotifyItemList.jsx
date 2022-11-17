import React from "react";

import { SpotifyItemTypes } from "../../enums/SpotifyItemTypes";
import CreatePlaylistNavbar from "../CreatePlaylistNavbar/CreatePlaylistNavbar";
import SpotifyItem from "../SpotifyItem/SpotifyItem";

import "./SpotifyItemList.scss";

const SpotifyItemList = ({ items, title }) => {
    const getContentForItem = (item) => {
        const showSubtitle = !!item.artists;

        return {
            imageUrl: item.image.url,
            title: item.name,
            ...(showSubtitle && {
                subtitle: item.artists.map((artist) => artist.name).join(", "),
            }),
        };
    };

    return (
        <div className="spotify-item-list-container">
            <ol className="spotify-item-list">
                {title && <h2>{title}</h2>}

                {items.map((item) => {
                    const content = getContentForItem(item);
                    return (
                        // <a>
                        <li>
                            <SpotifyItem {...content} />
                        </li>
                        // </a>
                    );
                })}
            </ol>

			<CreatePlaylistNavbar
				createPlaylist={() => {}}
			/>
        </div>
    );
};

export default SpotifyItemList;
