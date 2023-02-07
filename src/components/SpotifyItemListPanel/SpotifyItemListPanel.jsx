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
	showCreatePlaylistModal,
	isError,
	isLoading,
}) => {
	const [showAsGrid, setShowAsGrid] = useState(false);
	const [showImageCaption, setShowImageCaption] = useState(true);
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
				{showAsGrid && (
					<FormControlLabel
						control={
							<Checkbox
								value={showImageCaption}
								onChange={() =>
									setShowImageCaption(!showImageCaption)
								}
							/>
						}
						label="Hide Titles"
					/>
				)}
			</div>

			{isEmpty ? (
				<EmptyIndicator />
			) : (
				<SpotifyItemList
					items={items}
					isLoading={isLoading}
					showImageCaption={showImageCaption}
					showAsGrid={showAsGrid}
					setShowAsGrid={setShowAsGrid}
					showCreatePlaylistModal={showCreatePlaylistModal}
				/>
			)}
		</Container>
	);
};

export default SpotifyItemListPanel;
