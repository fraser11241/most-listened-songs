import { Button, Switch } from "@mui/material";
import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";

import "./SongsInPlaylistSelection.scss";

const SongsInPlaylistSelection = ({
	toggleIsIncludedInPlaylist,
	itemsInPlaylist,
	deselectAll,
	selectAll,
}) => {
	return (
		itemsInPlaylist && (
			<>
			<div style={{display: 'flex', justifyContent: 'end'}}> 
				<Button
					onClick={selectAll}
					type="button"
					variant="text"
				>
					Select all
				</Button>
				<Button
					onClick={deselectAll}
					type="button"
					variant="text"

				>
					Deselect all
				</Button>
			</div>

				<ol className="songs-in-playlist-selection">
					{itemsInPlaylist.map(
						({ item, isIncludedInPlaylist }, index) => (
							<li>
								<label
									className={`spotify-item-checkbox-container ${
										isIncludedInPlaylist
											? "included"
											: "not-included"
									}`}
								>
									<SpotifyItem item={item}>
										<Switch
											sx={{marginLeft: 'auto'}}
											checked={isIncludedInPlaylist}
											onChange={
												() => toggleIsIncludedInPlaylist(index)
											}
										/>
									</SpotifyItem>
								</label>
							</li>
						)
					)}
				</ol>
			</>
		)
	);
};

export default SongsInPlaylistSelection;
