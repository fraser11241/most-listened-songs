import React, { useEffect, useState, useContext } from "react";

import { SpotifyItemTypes, TimeRanges, MessageState } from "../../enums/enums";
import {
    fetchUserInfo,
    fetchUserRecentTracks,
    fetchUserTopArtists,
    fetchUserTopTracks,
} from "../../requests/userInfo";
import { getTopSongsFromArtists } from "../../requests/playlist";
import "./SpotifyMostListened.scss";

import loginContext from "../LoginHandler/LoginContext";
import SpotifyItemListPanel from "../SpotifyItemListPanel/SpotifyItemListPanel";
import PageWrapper from "../PageWrapper/PageWrapper";
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
    const [numArtists, setNumArtists] = useState(10);
    const [numSongsFromArtist, setNumSongsFromArtist] = useState(5);

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

    const getCurrentItemsForPlaylist = async () => {
        if (
            currentItemType === SpotifyItemTypes.RECENT_TRACK ||
            currentItemType === SpotifyItemTypes.TOP_TRACK
        ) {
            return getCurrentSpotifyItemsWithoutDuplicates();
        } else if (currentItemType === SpotifyItemTypes.ARTIST) {
            const artistsForPlaylist = topArtists.slice(0, numArtists);
            const artistIds = artistsForPlaylist.map(({ id }) => id);

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
                        await fetchUserTopArtists(
                            token,
                            currentTimeRange,
                            50
                        )
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
    const showMessage = !isCreatePlaylistModalOpen && message.message;

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
                            numArtists={numArtists}
                            setNumArtists={setNumArtists}
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
                            getCurrentItemsForPlaylist={
                                getCurrentItemsForPlaylist
                            }
                            showMessage={displayMessage}
                            isOpen={isCreatePlaylistModalOpen}
                            numSongsFromArtist={numSongsFromArtist}
                            setNumSongsFromArtist={setNumSongsFromArtist}
                            numArtists={numArtists}
                            setNumArtists={setNumArtists}
                            itemType={currentItemType}
                        />
                    )}
                </main>
            </div>
        </PageWrapper>
    );
};

export default SpotifyMostListened;
