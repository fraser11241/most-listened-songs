import React, { useEffect, useState, useContext } from "react";

import { SpotifyItemTypes, TimeRanges, MessageState } from "../../enums/enums";
import {
	fetchUserInfo,
	fetchUserRecentTracks,
	fetchUserTopArtists,
	fetchUserTopTracks,
} from "../../requests/userInfo";
import {
	createPlaylistFromSpotifyItems,
	getTopSongsFromArtists,
} from "../../requests/playlist";
import "./SpotifyMostListened.scss";

import loginContext from "../LoginHandler/LoginContext";
import SpotifyItemListPanel from "../SpotifyItemListPanel/SpotifyItemListPanel";
import PageContainer from "../PageContainer/PageContainer";
import CreatePlaylistModal from "../CreatePlaylistModal/CreatePlaylistModal";
import MessageModal from "../MessageModal/MessageModal";
import SpotifyItemListNavbar from "../SpotifyItemListNavbar/SpotifyItemListNavbar";

const SpotifyMostListened = () => {
	const [recentTracks, setRecentTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [currentItemType, setCurrentItemType] = useState(0);
	const [currentTimeRange, setCurrentTimeRange] = useState(
		TimeRanges.LONG_TERM
	);
	const [isErrorFetching, setIsErrorFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
		useState(false);
	const [message, setMessage] = useState({});

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

	const getCurrentSpotifyItemsCategoryText = () => {
		switch (currentItemType) {
			case SpotifyItemTypes.RECENT_TRACK:
				return "Recent Tracks";
			case SpotifyItemTypes.ARTIST:
				return "Top Artists";
			case SpotifyItemTypes.TOP_TRACK:
				return "Top Tracks";
			default:
				return "null";
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

	const getCurrentItemsForPlaylist = () => {
		if (
			currentItemType === SpotifyItemTypes.RECENT_TRACK ||
			currentItemType === SpotifyItemTypes.TOP_TRACK
		) {
			return getCurrentSpotifyItemsWithoutDuplicates();
		} else if (currentItemType === SpotifyItemTypes.ARTIST) {
			const numArtists = 10;
			const numSongsFromArtist = 5;

			const artistIds = topArtists
				.slice(0, numArtists)
				.map(({ id }) => id);

			return getTopSongsFromArtists(token, artistIds, numSongsFromArtist);
		}
	};

	const handleFetchingError = (e) => {
		setIsErrorFetching(true);
		setErrorMessage("There was an error fetching user info.");
	};

	const displayMessage = (
		message,
		state = MessageState.SUCCESS,
		modalProps
	) => {
		setMessage({
			message,
			state,
			...(modalProps || {}),
		});
	};

	const hideMessage = () => {
		setMessage({});
	};

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					setIsLoading(true);

					setRecentTracks(await fetchUserRecentTracks(token));
					setTopArtists(
						await fetchUserTopArtists(token, currentTimeRange)
					);
					setTopTracks(
						await fetchUserTopTracks(token, currentTimeRange)
					);
					setUserInfo(await fetchUserInfo(token));

					setIsLoading(false);
					setIsErrorFetching(false);
				} catch (e) {
					handleFetchingError(e);
				}
			})();
		}
	}, [token, currentTimeRange]);

	const showError = isErrorFetching;
	const showItemList =
		!isErrorFetching && recentTracks && recentTracks.length;
	const showMessage = !isCreatePlaylistModalOpen && message.message;

	console.log("CURRENT ITEM TYPE", currentItemType);
	return (
		<PageContainer>
			{/* <h1 className="title is-2">Spotify Most Listened</h1> */}

			<SpotifyItemListNavbar
				currentItemType={currentItemType}
				setCurrentItemType={setCurrentItemType}
			/>

			<SpotifyItemListPanel
				items={getCurrentSpotifyItemsWithoutDuplicates()}
				title={getCurrentSpotifyItemsCategoryText()}
				createPlaylist={createPlaylistFromSpotifyItems}
				currentTimeRange={currentTimeRange}
				isLoading={isLoading}
				isError={isErrorFetching}
			/>

			{/* {showError && (
				<div className="column is-10 has-background">
					{errorMessage || "Error fetching content"}
				</div>
			)}
			*/}

			{showMessage && (
				<MessageModal
					handleCloseModal={hideMessage}
					message={message}
				/>
			)}

			{isCreatePlaylistModalOpen && (
				<CreatePlaylistModal
					token={token}
					userId={userInfo.id}
					handleCloseModal={() => setIsCreatePlaylistModalOpen(false)}
					getCurrentItemsForPlaylist={getCurrentItemsForPlaylist}
					showMessage={displayMessage}
				/>
			)}
		</PageContainer>
	);
};

export default SpotifyMostListened;
