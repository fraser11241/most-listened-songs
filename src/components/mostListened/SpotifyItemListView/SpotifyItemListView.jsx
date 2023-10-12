import React from "react";
import { List, ListItem } from "@mui/material";

import SpotifyItem from "components/mostListened/SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "components/mostListened/SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";

const SkeletonLoadingItems = () =>
	[...Array(10)].map((_, index) => (
		<li key={index}>
			<SpotifyItemSkeletonLoading />
		</li>
	));

const SpotifyItemListView = ({ items, isLoading }) => {
	return (
		<List>
			{isLoading && <SkeletonLoadingItems />}

			{!isLoading &&
				items.map((item) => {
					return (
						<ListItem
							key={item.id}
							disablePadding
							sx={{ margin: "10px 0" }}
						>
							<SpotifyItem item={item} />
						</ListItem>
					);
				})}
		</List>
	);
};

export default SpotifyItemListView;
