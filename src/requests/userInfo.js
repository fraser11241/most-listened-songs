import { getEndpoint } from "./fetch";
import { TimeRanges } from "../enums/enums";

const timeRangeQueries = {
	[TimeRanges.SHORT_TERM]: "short_term",
	[TimeRanges.MEDIUM_TERM]: "medium_term",
	[TimeRanges.LONG_TERM]: "long_term",
};

export const fetchUserInfo = async (token) => {
	return await getEndpoint(token, "me");
};

export const fetchUserRecentTracks = async (
	token,
	limit = 50,
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/player/recently-played?limit=${limit}&offset=${offset}`
	);

	const recentTracks = items.map((item) => {
		const { artists, name, uri, id } = item.track;
		const image = item.track.album.images[0];

		return { artists, name, image, uri, id };
	});
	return recentTracks;
};

export const getUserTopTrackValues = (item) => {
	const { artists, id, name, uri, preview_url } = item;
	const image = item.album.images[0];

	return { artists, id, name, image, uri, preview_url };
};

export const fetchUserTopTracks = async (
	token,
	timeRange = TimeRanges.SHORT_TERM,
	limit = 50,
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/top/tracks?limit=${limit}&offset=${offset}&time_range=${timeRangeQueries[timeRange]}`
	);

	const topTracks = items.map((item) => {
		return getUserTopTrackValues(item);
	});
	return topTracks;
};

export const getUserTopArtistValues = (item) => {
	const image = item.images[0] || undefined;
	const { name, id, uri } = item;

	return { image, name, id, uri };
};

export const fetchUserTopArtists = async (
	token,
	timeRange = TimeRanges.SHORT_TERM,
	limit = 25,
	offset = "0"
) => {
	const { items } = await getEndpoint(
		token,
		`me/top/artists?limit=${limit}&offset=${offset}&time_range=${timeRangeQueries[timeRange]}`
	);

	const topArtists = items.map(getUserTopArtistValues);
	return topArtists;
};
