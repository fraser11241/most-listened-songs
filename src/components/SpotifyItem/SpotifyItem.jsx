import React from "react";

import "./SpotifyItem.scss";
import "./SpotifyItem.queries.css";

const SpotifyItem = ({ title, subtitle, imageUrl }) => {
	return (
		// <div className="spotify-item-wrapper">
		<div className="spotify-item-container">
			<img className="spotify-item-image" src={imageUrl} alt={title} />

			<div className="title-subtitle-wrapper">
				<span className="title">{title}</span>
				<span className="subtitle">{subtitle}</span>
			</div>
		</div>
		// </div>
	);
};

export default SpotifyItem;
