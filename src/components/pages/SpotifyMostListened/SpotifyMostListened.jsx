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
  const { token, logout: handleLogout } = useContext(loginContext);

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
      e.message === "Token expired. Please sign in again."
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
    document.getElementById("create-playlist-modal").close();
    document.getElementById("message-modal").showModal();
  };

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setIsLoading(true);

          setRecentTracks(await fetchUserRecentTracks(token));
          setTopArtists(await fetchUserTopArtists(token, currentTimeRange, 50));
          setTopTracks(await fetchUserTopTracks(token, currentTimeRange));
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

  const showItemList = !isErrorFetching;
  const showMessage = !!(!isCreatePlaylistModalOpen && message.message);

  return (
    <PageWrapper>
      <SpotifyItemListNavbar
        currentItemType={currentItemType}
        setCurrentItemType={setCurrentItemType}
        handleLogout={handleLogout}
      />
      <div className="h-full w-full">
        <main className="md:container mx-auto lg:max-w-[1024px]">
          {showItemList && (
            <SpotifyItemListPanel
              key={currentItemType}
              items={getCurrentSpotifyItemsWithoutDuplicates()}
              title={getCurrentSpotifyItemsCategoryText()}
              currentTimeRange={currentTimeRange}
              isLoading={isLoading}
              isError={isErrorFetching}
              showCreatePlaylistModal={() =>
                document.getElementById("create-playlist-modal").showModal()
              }
              timeRange={currentTimeRange}
              setTimeRange={setCurrentTimeRange}
              itemType={currentItemType}
            />
          )}

          <MessageModal message={message} />

          <ErrorToast
            message={errorState.message}
            open={errorState.showError}
            handleClose={clearError}
          />

          <CreatePlaylistModal
            token={token}
            userId={userInfo.id}
            handleCloseModal={() => setIsCreatePlaylistModalOpen(false)}
            items={getCurrentSpotifyItemsWithoutDuplicates()}
            showCreatedPlaylistModal={showMessageModal}
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
        </main>
      </div>
    </PageWrapper>
  );
};

export default SpotifyMostListened;
