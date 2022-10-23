const genericErrorHandler = (response) => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};

export const getEndpoint = async (token, path, method = "GET") => {
	return await fetch(`https://api.spotify.com/v1/${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(async (response) => await response.json()) // TODO need to check the response here and handle appropriately
		.then((json) => {
			return json;
		});
};

export const postDataToEndpoint = async (token, path, data) => {
	console.log("DATA", JSON.stringify(data));
	return await fetch(`https://api.spotify.com/v1/${path}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(genericErrorHandler)
		.then(async (response) => await response.json()) // TODO need to check the response here and handle appropriately
		.then((json) => {
			return json;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
};

export const getUserInfo = async (token) => {
	return await getEndpoint(token, "me");
};
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
		for (let i = 0; i <= trackUris.length % 100; i++) {
			const splicePosition = i * 100;
			const urisToAdd = trackUris.splice(
				splicePosition,
				splicePosition + 100
			);

			response = await _addSongs(urisToAdd);
		}
	}

	return response;
};

export const addAllSongsInAlbumToPlaylist = () => {};
