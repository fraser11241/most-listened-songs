import React, { useState } from "react";
import { Button, Slider, Switch, Typography } from "@mui/material";
import SpotifyItem from "../SpotifyItem/SpotifyItem";

import "./SongsInPlaylistSelection.scss";

const SongsInPlaylistSelection = ({
	toggleIsIncludedInPlaylist,
	itemsInPlaylist,
	deselectAll,
	selectAll,
}) => {
	console.log("ITEMS IN PLAYLIST", itemsInPlaylist);
	return (
		itemsInPlaylist && (
			<div className="songs-in-playlist-selection">
				<div style={{ display: "flex", justifyContent: "end" }}>
					<Button onClick={selectAll} type="button" variant="text">
						Select all
					</Button>
					<Button onClick={deselectAll} type="button" variant="text">
						Deselect all
					</Button>
				</div>

				<ol className="songs-in-playlist-selection">
					{itemsInPlaylist.map(
						({ item, isIncludedInPlaylist }, index) => (
							<li key={item.id || index}>
								<label
									className={`spotify-item-checkbox-container ${
										isIncludedInPlaylist
											? "included"
											: "not-included"
									}`}
								>
									<SpotifyItem item={item}>
										<Switch
											sx={{ marginLeft: "auto" }}
											checked={isIncludedInPlaylist}
											onChange={() =>
												toggleIsIncludedInPlaylist(
													index
												)
											}
										/>
									</SpotifyItem>
								</label>
							</li>
						)
					)}
				</ol>
			</div>
		)
	);
};

export default SongsInPlaylistSelection;
