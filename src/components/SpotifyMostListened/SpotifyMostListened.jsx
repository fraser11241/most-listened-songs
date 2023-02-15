import React, { useEffect, useState, useContext } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

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
import BottomNav from "../BottomNav/BottomNav";

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
	const [showItemListAsGrid, setShowItemListAsGrid] = useState(false);

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

	return (
		<PageContainer>
			<SpotifyItemListNavbar
				currentItemType={currentItemType}
				setCurrentItemType={setCurrentItemType}
			/>

			{showItemList && (
				<SpotifyItemListPanel
					items={getCurrentSpotifyItemsWithoutDuplicates()}
					title={getCurrentSpotifyItemsCategoryText()}
					currentTimeRange={currentTimeRange}
					isLoading={isLoading}
					isError={isErrorFetching}
					showCreatePlaylistModal={() =>
						setIsCreatePlaylistModalOpen(true)
					}
					timeRange={currentTimeRange}
					setTimeRange={setCurrentTimeRange}
				/>
			)}

			{/* {showError && (
				<div className="column is-10 has-background">
					{errorMessage || "Error fetching content"}
				</div>
			)}
			*/}

			<MessageModal
				handleCloseModal={hideMessage}
				message={message}
				isOpen={showMessage}
			/>

			<CreatePlaylistModal
				token={token}
				userId={userInfo.id}
				handleCloseModal={() => setIsCreatePlaylistModalOpen(false)}
				getCurrentItemsForPlaylist={getCurrentItemsForPlaylist}
				showMessage={displayMessage}
				isOpen={isCreatePlaylistModalOpen}
			/>
		</PageContainer>
	);
};

export default SpotifyMostListened;
