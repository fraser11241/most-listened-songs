import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	TextField,
} from "@mui/material";

import SongsInPlaylistSelection from "components/mostListened/SongsInPlaylistSelection/SongsInPlaylistSelection";
import {
	createPlaylistFromSpotifyItems,
	getGroupedTopSongsFromArtists,
	getPlaylistImage,
} from "requests/playlist";
import { MessageState, SpotifyItemTypes } from "config/enums";
import TopArtistSongSlider from "components/forms/TopArtistSongSliders/TopArtistSongSlider";

import "./CreatePlaylistModal.scss";

const CreatePlaylistModal = ({
	token,
	userId,
	isOpen,
	handleCloseModal,
	items,
	showCreatedPlaylistModal,
	itemType,
	showErrorMessage,
	children,
}) => {
	const [itemsInPlaylist, setItemsInPlaylist] = useState();
	const [numSongsFromArtist, setNumSongsFromArtist] = useState(5);
	const [numArtists, setNumArtists] = useState(5);
	const [groupedTopSongsFromArtists, setGroupedTopSongsFromArtist] = useState(
		{}
	);
	const DEFAULT_PLAYLIST_NAME = "Spotify Playlist";
	const MAX_TOP_SONGS_FOR_ARTIST = 10;

	const handleCreatingPlaylistError = (e) => {
		console.error("Error occurred while creating playlist", e);

		const errorMessageToDisplay =
			e.message === "Token expired"
				? "Token has expired"
				: "Error occurred while creating playlist";
		showErrorMessage(errorMessageToDisplay);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const playlistName =
				e.target.playlistName.value || DEFAULT_PLAYLIST_NAME;
			const playlistDescription = e.target.playlistDescription.value;

			const songCheckboxes = Array.from(e.target.playlistSong);
			if (!songCheckboxes) {
				throw new Error("No songs to add to playlist");
			}

			const spotifyItemsToIncludeInPlaylist = songCheckboxes.reduce(
				(arr, { checked: isIncluded }, index) => {
					if (isIncluded) {
						return [...arr, itemsInPlaylist[index]];
					}
					return arr;
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
				showCreatedPlaylistModal(
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

			handleCloseModal();
		} catch (e) {
			handleCreatingPlaylistError(e);
		}
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

				setItemsInPlaylist([...songsForEachArtistFlat]);
			})();
		} else {
			setItemsInPlaylist([...items]);
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
			component="form"
			onSubmit={handleSubmit}
		>
			<DialogTitle id="dialog-title">Create Playlist</DialogTitle>
			<DialogContent>
				<DialogContentText id="dialog-description"></DialogContentText>

				<TextField
					name="playlistName"
					defaultValue={DEFAULT_PLAYLIST_NAME}
					autoFocus
					margin="dense"
					label="Playlist Name"
					fullWidth
					variant="outlined"
					required
				/>
				<TextField
					name="playlistDescription"
					margin="dense"
					label="Playlist Description"
					fullWidth
					variant="outlined"
				/>

				{itemType === SpotifyItemTypes.ARTIST && (
					<TopArtistSongSlider
						numArtists={numArtists}
						setNumArtists={setNumArtists}
						numSongsFromArtist={numSongsFromArtist}
						setNumSongsFromArtist={setNumSongsFromArtist}
					/>
				)}

				<SongsInPlaylistSelection itemsInPlaylist={itemsInPlaylist} />
			</DialogContent>
			<DialogActions>
				<Button type="button" onClick={handleCloseModal}>
					Cancel
				</Button>
				<Button type="submit">Create Playlist</Button>
			</DialogActions>

			{children}
		</Dialog>
	);
};

export default CreatePlaylistModal;
