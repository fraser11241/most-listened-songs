import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "../SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";

const SkeletonLoadingItems = () =>
	[...Array(10)].map((_, index) => (
		<li key={index}>
			<SpotifyItemSkeletonLoading />
		</li>
	));

const SpotifyItemListView = ({ items, isLoading }) => {
	return (
		<ol className="spotify-item-list">
			{isLoading && <SkeletonLoadingItems />}

			{!isLoading &&
				items.map((item) => {
					return (
						<li key={item.id}>
							<SpotifyItem item={item} />
						</li>
					);
				})}
		</ol>
	);
};

export default SpotifyItemListView;
