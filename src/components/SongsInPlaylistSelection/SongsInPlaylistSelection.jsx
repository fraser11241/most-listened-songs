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
				<Button
					className="button is-small mb-1 deselect-all-button"
					onClick={selectAll}
					type="button"
				>
					Select all
				</Button>
				<Button
					className="button is-small mb-1 deselect-all-button"
					onClick={deselectAll}
					type="button"
				>
					Deselect all
				</Button>

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
											checked={isIncludedInPlaylist}
											onChange={
												toggleIsIncludedInPlaylist
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
