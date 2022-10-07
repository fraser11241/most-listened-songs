import React from "react";
import Box from "@mui/material/Box";

import { SpotifyItemTypes } from "../enums/SpotifyItemTypes";

const SpotifyItem = ({ item, type }) => {
	const { url, width: imageWidth, height: imageHeight } = item.image;

	return (
		<Box sx={{ display: "inline-flex" }}>
			<Box component="img" src={url} /> Text here
		</Box>
	);
};

export default SpotifyItem;
