import React, { useEffect, useState, useContext, useCallback } from "react";

import {
	fetchUserInfo,
	fetchUserRecentTracks,
	fetchUserTopArtists,
	fetchUserTopTracks,
} from "requests/userInfo";
import { SpotifyItemTypes, TimeRanges, MessageState } from "config/enums";
import loginContext from "components/login/LoginHandler/LoginContext";
import SpotifyItemListPanel from "components/mostListened/SpotifyItemListPanel/SpotifyItemListPanel";
import PageWrapper from "components/layout/PageWrapper/PageWrapper";
import CreatePlaylistModal from "components/layout/CreatePlaylistModal/CreatePlaylistModal";
import MessageModal from "components/layout/MessageModal/MessageModal";
import SpotifyItemListNavbar from "components/layout/SpotifyItemListNavbar/SpotifyItemListNavbar";
import ErrorToast from "components/common/ErrorToast/ErrorToast";

import "./SpotifyMostListened.scss";

const SpotifyMostListened = () => {
	const [recentTracks, setRecentTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [currentItemType, setCurrentItemType] = useState(0);
	const [currentTimeRange, setCurrentTimeRange] = useState(
		TimeRanges.LONG_TERM
	);
	const [errorState, setErrorState] = useState({
		showError: false,
		errorMessage: "",
	});
	const [modalError, setModalError] = useState({
		showError: false,
		errorMessage: "",
	});
	const [isErrorFetching, setIsErrorFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

	const handleFetchingError = useCallback((e) => {
		console.error("Error occurred while fetching", e);
		const errorMessage =
			e.message === "Token expired"
				? "Token has expired"
				: "Error occurred whilst fetching spotify data";

		setIsErrorFetching(true);
		showError(errorMessage);
	}, []);

	const showError = (message) => {
		setErrorState({ showError: true, message });
	};
	const clearError = () => {
		setErrorState({ showError: false });
	};

	const showErrorInModal = (message) => {
		setModalError({ showError: true, message });
	};

	const clearErrorInModal = () => {
		setModalError({ showError: false });
	};

	const showMessageModal = (
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

	const hideMessageModal = () => {
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
					clearError();
				} catch (e) {
					handleFetchingError(e);
				}
			})();
		}
	}, [token, currentTimeRange, handleFetchingError]);

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

					<MessageModal
						handleCloseModal={hideMessageModal}
						message={message}
						isOpen={showMessage}
					/>

					<ErrorToast
						message={errorState.message}
						open={errorState.showError}
						handleClose={clearError}
					/>

					{isCreatePlaylistModalOpen && (
						<CreatePlaylistModal
							token={token}
							userId={userInfo.id}
							handleCloseModal={() =>
								setIsCreatePlaylistModalOpen(false)
							}
							items={getCurrentSpotifyItemsWithoutDuplicates()}
							showCreatedPlaylistModal={showMessageModal}
							isOpen={true}
							itemType={currentItemType}
							showErrorMessage={showErrorInModal}
						>
							{
								<ErrorToast
									message={modalError.message}
									open={modalError.showError}
									handleClose={clearErrorInModal}
									autoHideDuration={6000}
								/>
							}
						</CreatePlaylistModal>
					)}
				</main>
			</div>
		</PageWrapper>
	);
};

export default SpotifyMostListened;
