import React from "react";

import "./SpotifyItemSkeletonLoading.scss";

const SpotifyItemSkeletonLoading = () => {
	return (
		<div className="skeleton spotify-item-container p-0">
			<span className="spotify-item-image p-0" />

			<div className="text-container">
				<div className="title" />
				<div className="subtitle" />
			</div>
		</div>
	);
};

export default SpotifyItemSkeletonLoading;
