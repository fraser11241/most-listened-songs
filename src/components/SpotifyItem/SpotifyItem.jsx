import React from "react";

import "./SpotifyItem.scss";

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

const SpotifyItem = ({ item, children }) => {
    const { title, subtitle, imageUrl } = getContentForItem(item);

    return (
        <div className="box spotify-item-container p-0">
            <img
                className="spotify-item-image p-0"
                src={imageUrl}
                alt={title}
            />

            <div className='text-container px-2'>
                <h3 className={`title is-6 ${subtitle ? 'mb-1' : ''}`}>{title}</h3>
                {subtitle && (
                    <p className="subtitle is-6">{subtitle}</p>
                )}
            </div>

            {children}
        </div>
    );
};

export default SpotifyItem;
