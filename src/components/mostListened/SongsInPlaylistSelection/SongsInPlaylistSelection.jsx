import React, { useEffect, useState } from "react";
import { Button, Switch, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";

import SpotifyItem from "components/mostListened/SpotifyItem/SpotifyItem";

const styles = {
	included: {
		boxShadow: "0 0 5px rgb(216, 216, 216)",
	},
	notIncluded: {
		"& img": {
			opacity: 0.7,
		},
	},
};

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
				<Box sx={{ display: "flex", justifyContent: "end" }}>
					<Button
						onClick={selectAll}
						type="button"
						variant="text"
						aria-label="Add all songs to selection"
					>
						Select all
					</Button>
					<Button
						onClick={deselectAll}
						type="button"
						variant="text"
						aria-label="Remove all songs from selection"
					>
						Deselect all
					</Button>
				</Box>

				<List>
					{itemsInPlaylist.map((item, index) => (
						<ListItem
							key={item.id}
							sx={{ display: "list-item" }}
							disablePadding
						>
							<Box component="label">
								<SpotifyItem
									item={item}
									styles={{
										cursor: "pointer",
										...(isIncludedInPlaylist[index]
											? styles.included
											: styles.notIncluded),
									}}
								>
									<Switch
										sx={{ marginLeft: "auto" }}
										name="playlistSong"
										checked={
											isIncludedInPlaylist[index] ?? true
										}
										onChange={() =>
											toggleIsIncludedInPlaylist(index)
										}
										inputProps={{
											"aria-label": item.name,
										}}
									/>
								</SpotifyItem>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
		)
	);
};

export default SongsInPlaylistSelection;
