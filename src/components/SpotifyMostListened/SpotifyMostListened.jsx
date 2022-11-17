import React, { useEffect, useState, useCallback, useContext } from "react";

import Navbar from "../Navbar";
import { SpotifyItemTypes } from "../../enums/SpotifyItemTypes";
import {
	fetchUserInfo,
	fetchUserRecentTracks,
	fetchUserTopArtists,
	fetchUserTopTracks,
} from "../../requests/userInfo";
import {
	createEmptyPlaylist as requestCreateEmptyPlaylist,
	addSongsToPlaylist as requestAddSongsToPlaylist,
	addTopSongsFromArtistsToPlaylist as requestAddTopSongsFromArtistsToPlaylist,
} from "../../requests/playlist";
import { callFunctionAndHandleErrors } from "../../requests/fetch";
import "./SpotifyMostListened.css";

import loginContext from "../LoginHandler/LoginContext";
import SpotifyItemList from "../SpotifyItemList";

const PLAYLIST_NAME = "API Playlist",
	PLAYLIST_DESC = "Playlist description";

const SpotifyMostListened = () => {
	const [recentTracks, setRecentTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [currentItemType, setCurrentItemType] = useState(0);
	const [isErrorFetching, setIsErrorFetching] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { token } = useContext(loginContext);

	// Return the correct type of items based on the currentItemType
	const getCurrentSpotifyItems = () => {
		switch (currentItemType) {
			case SpotifyItemTypes.RECENT_TRACK:
				return recentTracks;
			case SpotifyItemTypes.ARTIST:
				return topArtists;
			case SpotifyItemTypes.TOP_TRACK:
				return topTracks;
			default:
				return null;
		}
	};

	const getCurrentSpotifyItemsWithoutDuplicates = () => {
		const setOfNames = new Set();
		return getCurrentSpotifyItems().reduce((arr, value) => {
			if (setOfNames.has(value.name)) {
				return arr;
			}

			setOfNames.add(value.name);
			return [...arr, value];
		}, []);
	};

	const addItemsToPlaylist = async (playlistId, songItems) => {
		let uris = songItems.map(({ uri }) => uri);
		return await requestAddSongsToPlaylist(token, playlistId, uris);
	};

	const createEmptyPlaylist = async (isPublic = true) =>
		await requestCreateEmptyPlaylist(
			token,
			userInfo.id,
			PLAYLIST_NAME,
			PLAYLIST_DESC,
			isPublic
		);

	const createPlaylistFromCurrent = async () => {
		const { id: createdPlaylistId } = await createEmptyPlaylist();

		if (currentItemType === SpotifyItemTypes.ARTIST) {
			const numArtists = 10;
			const numSongsFromArtist = 5;

			const artistIds = topArtists
				.slice(0, numArtists)
				.map(({ id }) => id);

			requestAddTopSongsFromArtistsToPlaylist(
				token,
				createdPlaylistId,
				artistIds,
				numSongsFromArtist
			);
		} else if (
			currentItemType === SpotifyItemTypes.RECENT_TRACK ||
			currentItemType === SpotifyItemTypes.TOP_TRACK
		) {
			addItemsToPlaylist(
				createdPlaylistId,
				getCurrentSpotifyItemsWithoutDuplicates()
			);
		}
	};

	const handleFetchingError = (e) => {
		setIsErrorFetching(true);
		setErrorMessage("There was an error fetching user info.");
	};

	useEffect(() => {
		if (token) {
			const getUserInfo = async () => {
				setRecentTracks(await fetchUserRecentTracks(token));
				setTopArtists(await fetchUserTopArtists(token));
				setTopTracks(await fetchUserTopTracks(token));
				setUserInfo(await fetchUserInfo(token));
			};

			callFunctionAndHandleErrors(getUserInfo, handleFetchingError);
		}
	}, [token]);

	return (
		<div className="page with-sidenav">
			{token && (
				<>
					<Navbar
						buttons={[
							{
								text: "Recently listened tracks",
								onClick: () =>
									setCurrentItemType(
										SpotifyItemTypes.RECENT_TRACK
									),
							},
							{
								text: "Most listened artists",
								onClick: () =>
									setCurrentItemType(SpotifyItemTypes.ARTIST),
							},
							{
								text: "Most listened songs",
								onClick: () =>
									setCurrentItemType(
										SpotifyItemTypes.TOP_TRACK
									),
							},
						]}
					/>
				</>
			)}

			<div className="page-content">
				<div
					className="page-header"
					style={{
						width: "100%",
						height: "125px",
						backgroundColor: "turquoise",
					}}
				></div>

				{/* TODO Show more song info on hover/focus  */}
				{isErrorFetching ? (
					errorMessage
				) : (
					<div className="page-body">
						<button
							onClick={async () =>
								await createPlaylistFromCurrent()
							}
						>
							CREATE PLAYLIST
						</button>
						{recentTracks && recentTracks.length && (
							<SpotifyItemList
								items={getCurrentSpotifyItemsWithoutDuplicates()}
								type={currentItemType}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SpotifyMostListened;
