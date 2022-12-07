import React from 'react';

import SpotifyItem from "../SpotifyItem/SpotifyItem";
import CreatePlaylistNavbar from '../CreatePlaylistNavbar/CreatePlaylistNavbar';

const SpotifyItemList = ( {items, createPlaylist} ) => {
    return <>
        {
            items.map((item) => {
                return (
                    <li className="mb-2">
                        <SpotifyItem item={item} />
                    </li>
                );
            })
        }
        <CreatePlaylistNavbar createPlaylist={createPlaylist} />
    </>
}

export default SpotifyItemList;