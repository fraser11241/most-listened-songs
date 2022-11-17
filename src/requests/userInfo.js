import { getEndpoint } from "./fetch";

export const fetchUserInfo = async (token) => {
	return await getEndpoint(token, "me");
};

export const fetchUserRecentTracks = async (
	token,
	limit = 50,
	timeRange = "short_term",
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/player/recently-played?limit=${limit}&offset=${offset}&time_range=${timeRange}`
	);

	const recentTracks = items.map((item) => {
		const { artists, name, uri } = item.track;
		const image = item.track.album.images[0];

		return { artists, name, image, uri };
	});
	return recentTracks;
};

export const fetchUserTopTracks = async (
	token,
	limit = 50,
	timeRange = "short_term",
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/top/tracks?limit=${limit}&offset=${offset}&time_range=${timeRange}`
	);

	const topTracks = items.map((item) => {
		const { artists, id, name, uri } = item;
		const image = item.album.images[0];

		return { artists, id, name, image, uri };
	});
	return topTracks;
};

export const fetchUserTopArtists = async (
	token,
	limit = 25,
	timeRange = "long_term",
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/top/artists?limit=${limit}&offset=${offset}&time_range=${timeRange}`
	);

	const topArtists = items.map((item) => {
		const image = item.images[0] || undefined;
		const { name, id, uri } = item;

		return { image, name, id, uri };
	});
	return topArtists;
};
