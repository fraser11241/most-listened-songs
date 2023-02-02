import {
	Checkbox,
	Container,
	FormControlLabel,
	Typography,
} from "@mui/material";
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
	showAsGrid,
}) => {
	const [showImageCaption, setShowImageCaption] = useState(false);
	const isEmpty = !isError && !items.length && !isLoading;

	return (
		<Container maxWidth="md">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{title && (
					<Typography component="h2" variant="h5">
						{title}
					</Typography>
				)}
				<FormControlLabel
					control={
						<Checkbox
							value={showImageCaption}
							onChange={() =>
								setShowImageCaption(!showImageCaption)
							}
						/>
					}
					label="Show Titles"
				/>
			</div>

			{isEmpty ? (
				<EmptyIndicator />
			) : (
				<SpotifyItemList
					items={items}
					createPlaylist={createPlaylist}
					isLoading={isLoading}
					showImageCaption={showImageCaption}
					showAsGrid={showAsGrid}
				/>
			)}
		</Container>
	);
};

export default SpotifyItemListPanel;
