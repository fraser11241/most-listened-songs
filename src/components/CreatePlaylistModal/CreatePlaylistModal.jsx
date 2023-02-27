import React, { useState, useEffect } from "react";

import SongsInPlaylistSelection from "../SongsInPlaylistSelection/SongsInPlaylistSelection";
import {
	createPlaylistFromSpotifyItems,
	getPlaylistImage,
} from "../../requests/playlist";
import { createMessageObject } from "../SpotifyMostListened/SpotifyMostListened";
import { MessageState } from "../../enums/enums";

import "./CreatePlaylistModal.scss";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import SpotifyItemList from "../SpotifyItemList/SpotifyItemList";

// TODO Add slider for number of items from each artist for artist creating playlist
const CreatePlaylistModal = ({
	token,
	userId,
	isOpen,
	handleCloseModal,
	getCurrentItemsForPlaylist,
	showMessage,
	numSongsFromArtist,
	setNumSongsFromArtist,
	itemType
}) => {
	const [itemsInPlaylist, setItemsInPlaylist] = useState();
	const [playlistName, setPlaylistName] = useState("Playlist Name");
	const [playlistDescription, setPlaylistDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const spotifyItemsToIncludeInPlaylist = itemsInPlaylist.reduce(
				(arr, { item, isIncludedInPlaylist }) => {
					if (isIncludedInPlaylist) {
						return [...arr, item];
					} else {
						return arr;
					}
				},
				[]
			);

			const playlistId = await createPlaylistFromSpotifyItems(
				token,
				userId,
				playlistName || "Playlist Name",
				playlistDescription || "",
				spotifyItemsToIncludeInPlaylist
			);

			if (playlistId) {
				const createdPlaylistUri = `spotify:playlist:${playlistId}`;
				const createdPlaylistImage = await getPlaylistImage(
					token,
					playlistId
				);
				showMessage(
					"Playlist created sucessfully",
					MessageState.SUCCESS,
					{
						playlistLink: createdPlaylistUri,
						playlistImage:
							createdPlaylistImage.length &&
							createdPlaylistImage[0]?.url,
					}
				);
			} else {
				throw new Error("No playlist created");
			}
		} catch (e) {
			console.error(e);
			showMessage("Error creating playlist", MessageState.ERROR);
		}
		handleCloseModal();
	};

	const toggleIsIncludedInPlaylist = (index) => {
		setItemsInPlaylist(
			itemsInPlaylist.map((item, itemIndex) => {
				if (itemIndex !== index) {
					return {
						...item,
					};
				}
				return {
					...item,
					isIncludedInPlaylist: !item.isIncludedInPlaylist,
				};
			})
		);
	};

	const deselectAll = () => {
		setItemsInPlaylist(
			itemsInPlaylist.map((item) => {
				return {
					...item,
					isIncludedInPlaylist: false,
				};
			})
		);
	};

	const selectAll = () => {
		setItemsInPlaylist(
			itemsInPlaylist.map((item) => {
				return {
					...item,
					isIncludedInPlaylist: true,
				};
			})
		);
	};

	const getItemsForSelection = async () => {
		getCurrentItemsForPlaylist().then((items) => {
			setItemsInPlaylist(
				items.map((item) => {
					return {
						item,
						isIncludedInPlaylist: true,
					};
				})
			);
		});
	}

	useEffect(() => {
		getItemsForSelection();
	}, [getCurrentItemsForPlaylist, numSongsFromArtist]);

	return (
			<Dialog
				open={isOpen}
				onClose={handleCloseModal}
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>

				<DialogTitle id="dialog-title">Create Playlist</DialogTitle>
				<DialogContent>
					<DialogContentText id="dialog-description"></DialogContentText>

					<TextField
						autoFocus
						margin="dense"
						label="Playlist Name"
						fullWidth
						variant="outlined"
						value={playlistName}
						onChange={(e) => {
							setPlaylistName(e.target.value);
						}}
						required
					/>
					<TextField
						margin="dense"
						label="Playlist Description"
						fullWidth
						variant="outlined"
						value={playlistDescription}
						onChange={(e) => {
							setPlaylistDescription(e.target.value);
						}}
					/>

					<SongsInPlaylistSelection
						itemsInPlaylist={itemsInPlaylist}
						deselectAll={deselectAll}
						selectAll={selectAll}
						toggleIsIncludedInPlaylist={toggleIsIncludedInPlaylist}
						numSongsFromArtist={numSongsFromArtist}
						setNumSongsFromArtist={setNumSongsFromArtist}
						itemType={itemType}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal}>Cancel</Button>
					<Button onClick={handleSubmit}>Create Playlist</Button>
				</DialogActions>

			</Dialog>
	);
};

export default CreatePlaylistModal;
