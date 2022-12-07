import React from 'react';

import './Navbar.scss';

import {SpotifyItemTypes} from '../../enums/SpotifyItemTypes';

const Navbar = ({setCurrentItemType}) => {
    return (
        <aside class="menu sidebar">
            <p class="menu-label">Label here</p>
            <ul class="menu-list">
                <li>
                    <button className="button" onClick={() => setCurrentItemType(SpotifyItemTypes.RECENT_TRACK)}>Recent Tracks</button>
                </li>
                <li>
                    <button className="button" onClick={() => setCurrentItemType(SpotifyItemTypes.ARTIST)}>Top Artists</button>
                </li>
                <li>
                    <button className="button" onClick={() => setCurrentItemType(SpotifyItemTypes.TOP_TRACK)}>Top Tracks</button>
                </li>
            </ul>
        </aside>
    );
};

export default Navbar;