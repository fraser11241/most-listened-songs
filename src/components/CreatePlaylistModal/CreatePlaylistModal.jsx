import React, { useState, useEffect } from "react";

import SongsInPlaylistSelection from "../SongsInPlaylistSelection/SongsInPlaylistSelection";
import {
	createPlaylistFromSpotifyItems,
	getGroupedTopSongsFromArtists,
	getPlaylistImage,
} from "../../requests/playlist";
import { createMessageObject } from "../SpotifyMostListened/SpotifyMostListened";
import { MessageState, SpotifyItemTypes } from "../../enums/enums";

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
import TopArtistSongSlider from "../TopArtistSongSliders/TopArtistSongSlider";

// TODO Add slider for number of items from each artist for artist creating playlist
const CreatePlaylistModal = ({
	token,
	userId,
	isOpen,
	handleCloseModal,
	items,
	showMessage,
	itemType,
}) => {
	const [itemsInPlaylist, setItemsInPlaylist] = useState();
	const [playlistName, setPlaylistName] = useState("Playlist Name");
	const [playlistDescription, setPlaylistDescription] = useState("");
	const [numSongsFromArtist, setNumSongsFromArtist] = useState(5);
	const [numArtists, setNumArtists] = useState(5);
	const [groupedTopSongsFromArtists, setGroupedTopSongsFromArtist] = useState(
		{}
	);
	const MAX_TOP_SONGS_FOR_ARTIST = 10;

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

	useEffect(() => {
		if (itemType === SpotifyItemTypes.ARTIST) {
			(async () => {
				let topSongsMap = groupedTopSongsFromArtists;
				const topArtistIds = items.map(({ id }) => id);
				const artistIdsForPlaylist = topArtistIds.slice(0, numArtists);

				const artistsIdsWithMissingSongs = topArtistIds.filter(
					(id) => !(id in groupedTopSongsFromArtists)
				);

				// Get any missing songs
				if (artistsIdsWithMissingSongs.length) {
					const missingSongs = await getGroupedTopSongsFromArtists(
						token,
						artistsIdsWithMissingSongs,
						MAX_TOP_SONGS_FOR_ARTIST
					);
					const newArtistTopSongs = {
						...groupedTopSongsFromArtists,
						...missingSongs,
					};
					setGroupedTopSongsFromArtist(newArtistTopSongs);
					topSongsMap = newArtistTopSongs;
				}

				const groupedSongsForEachArtist = artistIdsForPlaylist.map(
					(id) => topSongsMap[id].slice(0, numSongsFromArtist)
				);
				const songsForEachArtistFlat = [].concat(
					...groupedSongsForEachArtist
				);

				setItemsInPlaylist(
					songsForEachArtistFlat.map((item) => {
						return {
							item,
							isIncludedInPlaylist: true,
						};
					})
				);
			})();
		} else {
			setItemsInPlaylist(
				items.map((item) => {
					return {
						item,
						isIncludedInPlaylist: true,
					};
				})
			);
		}
	}, [
		groupedTopSongsFromArtists,
		itemType,
		items,
		numArtists,
		numSongsFromArtist,
		token,
	]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullScreen
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

				{itemType === SpotifyItemTypes.ARTIST && (
					<TopArtistSongSlider
						numArtists={numArtists}
						setNumArtists={setNumArtists}
						numSongsFromArtist={numSongsFromArtist}
						setNumSongsFromArtist={setNumSongsFromArtist}
					/>
				)}

				<SongsInPlaylistSelection
					itemsInPlaylist={itemsInPlaylist}
					deselectAll={deselectAll}
					selectAll={selectAll}
					toggleIsIncludedInPlaylist={toggleIsIncludedInPlaylist}
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
