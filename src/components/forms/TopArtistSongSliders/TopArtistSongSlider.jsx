import React, { useState } from "react";
import { Typography, Slider } from "@mui/material";

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
		<div style={{ marginTop: "20px" }} className="select">
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
			/>
		</div>
	);
};

export default TopArtistSongSlider;
