import React, { useEffect, useState, useContext } from "react";

import { SpotifyItemTypes, TimeRanges, MessageState } from "../../config/enums";
import {
	fetchUserInfo,
	fetchUserRecentTracks,
	fetchUserTopArtists,
	fetchUserTopTracks,
} from "../../requests/userInfo";
import {
	getGroupedTopSongsFromArtists,
	getTopSongsFromArtists,
} from "../../requests/playlist";
import "./SpotifyMostListened.scss";

import loginContext from "../LoginHandler/LoginContext";
import SpotifyItemListPanel from "../SpotifyItemListPanel/SpotifyItemListPanel";
import PageWrapper from "../PageWrapper/PageWrapper";
import CreatePlaylistModal from "../CreatePlaylistModal/CreatePlaylistModal";
import MessageModal from "../MessageModal/MessageModal";
import SpotifyItemListNavbar from "../SpotifyItemListNavbar/SpotifyItemListNavbar";
import { Snackbar } from "@mui/material";
import Button from "@restart/ui/esm/Button";

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
		const setOfIds = new Set();
		return getCurrentSpotifyItems().reduce((arr, value) => {
			if (setOfIds.has(value.id)) {
				return arr;
			}

			setOfIds.add(value.id);
			return [...arr, value];
		}, []);
	};

	const handleFetchingError = (e) => {
		console.error("Error occurred while fetching", e);
		setIsErrorFetching(true);

		if (e.message === "Token expired") {
			setErrorMessage("Token has expired");
		} else {
			setErrorMessage("Error occurred whilst fetching");
		}
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
						await fetchUserTopArtists(token, currentTimeRange, 50)
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

	const showItemList =
		!isErrorFetching && recentTracks && recentTracks.length;
	const showMessage = !!(!isCreatePlaylistModalOpen && message.message);

	return (
		<PageWrapper>
			<div
				className="page-container"
				style={{
					height: "100%",
					width: "100%",
					/* display: inline-flex; */
					flexDirection: "column",
					display: "flex",
				}}
			>
				<SpotifyItemListNavbar
					currentItemType={currentItemType}
					setCurrentItemType={setCurrentItemType}
				/>

				<main style={{ flexGrow: 1 }}>
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
							itemType={currentItemType}
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

					{isCreatePlaylistModalOpen && (
						<CreatePlaylistModal
							token={token}
							userId={userInfo.id}
							handleCloseModal={() =>
								setIsCreatePlaylistModalOpen(false)
							}
							items={getCurrentSpotifyItemsWithoutDuplicates()}
							showMessage={displayMessage}
							isOpen={isCreatePlaylistModalOpen}
							itemType={currentItemType}
						/>
					)}
				</main>
			</div>
		</PageWrapper>
	);
};

export default SpotifyMostListened;
