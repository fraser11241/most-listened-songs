import React from 'react';

import './CreatePlaylistBottomNav.scss';

const CreatePlaylistNavbar = ({createPlaylist}) => {
    return (
        <div className="bottom-navbar">
            <button className="button" onClick={createPlaylist}>
                Create playlist
            </button>
        </div>
    )
};

export default CreatePlaylistNavbar;