import { getEndpoint, postDataToEndpoint } from "./fetch";
import { getUserTopTrackValues } from "./userInfo";

export const createEmptyPlaylist = async (
    token,
    userId,
    name,
    description,
    isPublic = false
) => {
    const path = `users/${userId}/playlists`;
    const data = {
        name,
        description,
        public: isPublic,
    };
    return await postDataToEndpoint(token, path, data);
};

export const addSongsToPlaylist = async (token, playlistId, trackUris) => {
    const path = `playlists/${playlistId}/tracks`;

    const _addSongs = async (uris) => {
        const data = {
            uris: uris,
        };

        return await postDataToEndpoint(token, path, data);
    };

    // Only 100 tracks can be added in 1 request, so if there is more than 100 split into multiple requests
    let response;

    if (!trackUris.length) {
        return null;
    } else if (trackUris.length <= 100) {
        response = await _addSongs(trackUris);
    } else {
        for (let i = 0; i < Math.ceil(trackUris.length / 100); i++) {
            const splicePosition = i * 100;
            const urisToAdd = [...trackUris].slice(
                splicePosition,
                splicePosition + 100
            );

            response = await _addSongs(urisToAdd);
        }
    }

    return response;
};

export const addAllSongsInAlbumToPlaylist = () => {};

export const getTopTracksFromArtist = async (token, artistId, limit = "5") => {
    return await getEndpoint(token, `artists/${artistId}/top-tracks?market=gb`)
        .then((result) => result["tracks"].splice(0, limit))
        .catch((error) => console.log("error", error));
};

export const getTopSongsFromArtists = async (
    token,
    artistIds,
    songsFromEachArtist = "5"
) => {
    const topTracksForEachArtist = await Promise.all(
        artistIds.map(async (id) => {
            return await getTopTracksFromArtist(token, id, songsFromEachArtist);
        })
    );
    const topTracks = [].concat(...topTracksForEachArtist);
    return topTracks.map(getUserTopTrackValues);
};

export const createPlaylistFromSpotifyItems = async (
    token,
    userId,
    playlistName,
    playlistDescription,
    spotifyItems,
    isPublic = true
) => {
    const {id: playlistId} = await createEmptyPlaylist(
        token,
        userId,
        playlistName,
        playlistDescription,
        isPublic
    )
        .catch(e => {
			console.log(e);
			return null;
		});

	if(!playlistId) {
		return false;
	}

	const uris = spotifyItems.map(({uri}) => uri);
	const {snapshot_id} = await addSongsToPlaylist(token, playlistId, uris);

	return !!snapshot_id;
};
