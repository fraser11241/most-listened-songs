import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "../SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";

import "./SpotifyItemList.scss";

const SkeletonLoadingItems = () =>
	[...Array(10)].map(() => (
		<li>
			<SpotifyItemSkeletonLoading />
		</li>
	));

const SpotifyItemList = ({ items, createPlaylist, isLoading }) => {
	return (
		<ol className="spotify-item-list">
			{isLoading && <SkeletonLoadingItems />}

			{!isLoading &&
				items.map((item) => {
					return (
						<li>
							<SpotifyItem item={item} />
						</li>
					);
				})}
		</ol>
	);
};

export default SpotifyItemList;
