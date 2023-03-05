import React, { useEffect, useState } from "react";
import { Button, Slider, Switch, Typography } from "@mui/material";
import SpotifyItem from "../SpotifyItem/SpotifyItem";

import "./SongsInPlaylistSelection.scss";
import { Box } from "@mui/system";

const SongsInPlaylistSelection = ({ itemsInPlaylist }) => {
	const [isIncludedInPlaylist, setIsIncludedInPlaylist] = useState(
		itemsInPlaylist?.length ? itemsInPlaylist.map(() => true) : []
	);

	const toggleIsIncludedInPlaylist = (indexToToggle) => {
		setIsIncludedInPlaylist(
			isIncludedInPlaylist.map((isIncluded, index) =>
				index === indexToToggle ? !isIncluded : isIncluded
			)
		);
	};

	const selectAll = () => {
		setIsIncludedInPlaylist(itemsInPlaylist.map(() => true));
	};

	const deselectAll = () => {
		setIsIncludedInPlaylist(itemsInPlaylist.map(() => false));
	};

	useEffect(() => {
		setIsIncludedInPlaylist(
			itemsInPlaylist?.length ? itemsInPlaylist.map(() => true) : []
		);
	}, [itemsInPlaylist]);

	return (
		itemsInPlaylist && (
			<Box>
				<div style={{ display: "flex", justifyContent: "end" }}>
					<Button onClick={selectAll} type="button" variant="text">
						Select all
					</Button>
					<Button onClick={deselectAll} type="button" variant="text">
						Deselect all
					</Button>
				</div>

				<ol className="songs-in-playlist-selection">
					{itemsInPlaylist.map((item, index) => (
						<li key={item.id}>
							<label
								className={`spotify-item-checkbox-container ${
									isIncludedInPlaylist[index]
										? "included"
										: "not-included"
								}`}
							>
								<SpotifyItem item={item}>
									<Switch
										sx={{ marginLeft: "auto" }}
										name="playlistSong"
										checked={
											isIncludedInPlaylist[index] ?? true
										}
										onChange={() =>
											toggleIsIncludedInPlaylist(index)
										}
									/>
								</SpotifyItem>
							</label>
						</li>
					))}
				</ol>
			</Box>
		)
	);
};

export default SongsInPlaylistSelection;
