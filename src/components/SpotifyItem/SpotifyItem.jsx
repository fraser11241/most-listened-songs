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
		<div className="spotify-item-container">
			<img className="spotify-item-image" src={imageUrl} alt={title} />

			<div className="text-container">
				<h3>{title}</h3>
				{subtitle && <p>{subtitle}</p>}
			</div>

			{children}
		</div>
	);
};

export default SpotifyItem;
