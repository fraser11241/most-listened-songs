import React from "react";
import Box from "@mui/material/Box";

import SpotifyItem from "./SpotifyItem";

const SpotifyItemList = ({ items, type }) => {
	return (
		<Box>
			{items.map((item) => {
				return <SpotifyItem item={item} type={type} />;
			})}
		</Box>
	);
};

export default SpotifyItemList;
