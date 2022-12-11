import React, { useEffect, useState, useContext } from "react";

import { SpotifyItemTypes, TimeRanges } from "../../enums/enums";
import {
    fetchUserInfo,
    fetchUserRecentTracks,
    fetchUserTopArtists,
    fetchUserTopTracks,
} from "../../requests/userInfo";
import {
    createEmptyPlaylist as requestCreateEmptyPlaylist,
    addSongsToPlaylist as requestAddSongsToPlaylist,
    getTopSongsFromArtists as requestGetTopSongsFromArtists,
} from "../../requests/playlist";
import { callFunctionAndHandleErrors } from "../../requests/fetch";
import "./SpotifyMostListened.scss";

import loginContext from "../LoginHandler/LoginContext";
import SpotifyItemListPanel from "../SpotifyItemListPanel/SpotifyItemListPanel";
import PageContainer from "../PageContainer/PageContainer";
import Navbar from "../Navbar/Navbar";
import CreatePlaylistModal from "../CreatePlaylistModal/CreatePlaylistModal";

const PLAYLIST_NAME = "API Playlist",
    PLAYLIST_DESC = "Playlist description";

const SpotifyMostListened = () => {
    const [recentTracks, setRecentTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [currentItemType, setCurrentItemType] = useState(0);
    const [currentTimeRange, setCurrentTimeRange] = useState(TimeRanges.LONG_TERM)
    const [isErrorFetching, setIsErrorFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
        useState(false);

    const { token } = useContext(loginContext);

    /*
        // TODO Handle empty states
    */

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

            return requestGetTopSongsFromArtists(
                token,
                artistIds,
                numSongsFromArtist
            );
        }
    };

    const handleFetchingError = (e) => {
        setIsErrorFetching(true);
        setErrorMessage("There was an error fetching user info.");
    };

    useEffect(() => {
        if (token && currentItemType === SpotifyItemTypes.ARTIST || currentItemType === SpotifyItemTypes.TOP_TRACK) {
            const getUserInfo = async () => {
                setRecentTracks(await fetchUserRecentTracks(token));
                setTopArtists(await fetchUserTopArtists(token, currentTimeRange));
                setTopTracks(await fetchUserTopTracks(token, currentTimeRange));
                setUserInfo(await fetchUserInfo(token));
            };

            callFunctionAndHandleErrors(getUserInfo, handleFetchingError);
        }
    }, [currentTimeRange]);

    useEffect(() => {
        if (token) {
            const getUserInfo = async () => {
                setRecentTracks(await fetchUserRecentTracks(token));
                setTopArtists(await fetchUserTopArtists(token, currentTimeRange));
                setTopTracks(await fetchUserTopTracks(token, currentTimeRange));
                setUserInfo(await fetchUserInfo(token));
            };

            callFunctionAndHandleErrors(getUserInfo, handleFetchingError);
        }
    }, [token]);

    const showError = isErrorFetching;
    const showItemList =
        !isErrorFetching && recentTracks && recentTracks.length;

        return (
        <PageContainer>
            <div className="column is-narrow is-desktop p-0">
                <Navbar 
                    currentItemType={currentItemType}
                    currentTimeRange={currentTimeRange}
                    setCurrentItemType={setCurrentItemType} 
                    setCurrentTimeRange={setCurrentTimeRange} 
                />
            </div>

            {showError && (errorMessage || "Error fetching content")}
            {showItemList && (
                <div className="column is-10 has-background">
                    <div className="box content item-list-container">
                        <SpotifyItemListPanel
                            items={getCurrentSpotifyItemsWithoutDuplicates()}
                            title={getCurrentSpotifyItemsCategoryText()}
                            currentTimeRange={currentTimeRange}
                            setCurrentTimeRange={setCurrentTimeRange}
                            createPlaylist={() =>
                                setIsCreatePlaylistModalOpen(true)
                            }
                        />
                    </div>
                </div>
            )}

            <CreatePlaylistModal
                token={token}
                userId={userInfo.id}
                isOpen={isCreatePlaylistModalOpen}
                handleCloseModal={() => setIsCreatePlaylistModalOpen(false)}
                getCurrentItemsForPlaylist={getCurrentItemsForPlaylist}
            />
        </PageContainer>
    );
};

export default SpotifyMostListened;
