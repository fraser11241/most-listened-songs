import React, { useState } from "react";
import { Typography, Slider } from "@mui/material";
import { Box } from "@mui/system";

const TopArtistSongSlider = ({
	numArtists,
	setNumArtists,
	numSongsFromArtist,
	setNumSongsFromArtist,
}) => {
	const [itemsPerArtistSliderValue, setItemsPerArtistSliderValue] =
		useState(numSongsFromArtist);
	const [numArtistsSliderValue, setNumArtistsSliderValue] =
		useState(numArtists);

	return (
		<Box sx={{ marginTop: 2 }}>
			<Typography variant="body1" fontWeight={"bolder"}>
				Songs Per Artist
			</Typography>

			<Slider
				marks={true}
				valueLabelDisplay="auto"
				step={1}
				min={1}
				max={10}
				value={itemsPerArtistSliderValue}
				onChange={(e) => {
					setItemsPerArtistSliderValue(e.target.value);
				}}
				onChangeCommitted={(e) => {
					setNumSongsFromArtist(itemsPerArtistSliderValue);
				}}
				aria-label="Songs per artist"
			/>

			<Typography variant="body1" fontWeight={"bolder"}>
				Number of artists
			</Typography>

			<Slider
				marks={true}
				valueLabelDisplay="auto"
				step={1}
				min={1}
				max={50}
				value={numArtistsSliderValue}
				onChange={(e) => {
					setNumArtistsSliderValue(e.target.value);
				}}
				onChangeCommitted={(e) => {
					setNumArtists(numArtistsSliderValue);
				}}
				aria-label="Number of artists"
			/>
		</Box>
	);
};

export default TopArtistSongSlider;
