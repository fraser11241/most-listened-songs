import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import EmptyIndicator from "../EmptyIndicator/EmptyIndicator";
import SpotifyItemList from "../SpotifyItemList/SpotifyItemList";

import "./SpotifyItemListPanel.scss";

const SpotifyItemListPanel = ({
	items,
	title,
	createPlaylist,
	isError,
	isLoading,
}) => {
	const isEmpty = !isError && !items.length && !isLoading;

	return (
		<Container maxWidth="md">
			{title && <Typography component="h2" variant="h5">{title}</Typography>}
			{isEmpty ? (
				<EmptyIndicator />
			) : (
				<SpotifyItemList
					items={items}
					createPlaylist={createPlaylist}
					isLoading={isLoading}
				/>
			)}
		</Container>
	);
};

export default SpotifyItemListPanel;
