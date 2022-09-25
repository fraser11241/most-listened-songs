import React, { useEffect, useState, useCallback } from "react";

import "./App.css";

const App = () => {
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);

	const CLIENT_ID = "9140a43db1f0411aa6a5255f3e333b18";
	const REDIRECT_URI =
		window.location.href && window.location.href.includes("localhost")
			? "http://localhost:3000/spotify-most-listened"
			: "https://fraser11241.github.io/spotify-most-listened/";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE =
		"user-top-read user-read-recently-played user-read-playback-state playlist-modify-public playlist-modify-private";

	useEffect(() => {
		// TODO - handle timeout
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}
		setToken(token);
	}, []);

	const getEndpoint = useCallback(
		async (path, method = "GET") => {
			return await fetch(`https://api.spotify.com/v1/${path}`, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(async (response) => await response.json())
				.then((json) => {
					return json;
				});
		},
		[token]
	);

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	const fetchUserTopTracks = useCallback(
		async (limit = 50) => {
			/**
			 * https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=long_term
			 * https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=long_term
			 *
			 */
			const { items } = await getEndpoint(
				`me/player/recently-played?limit=${limit}`
			);

			const images = items.map(
				(item) => item.track.album.images[0] || undefined
			);
			const trackNames = items.map((item) => item.track.name);
			return { images: images, trackNames: trackNames };
		},
		[getEndpoint]
	);

	const getImages = () => {
		return (
			images &&
			images.map(({ url }) => (
				<li>
					<img
						src={url}
						style={{
							maxHeight: "100%",
							minWidth: "100%",
						}}
					/>
				</li>
			))
		);
	};

	useEffect(() => {
		if (token) {
			(async () => {
				const { images, trackNames } = await fetchUserTopTracks();
				setImages(images);
				setLoading(false);
			})();
		}
	}, [token, fetchUserTopTracks]);

	return (
		<div style={{ margin: "auto" }}>
			{/* <h1>Most listened</h1> */}
			{!token ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
				>
					Login to Spotify
				</a>
			) : (
				<button
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						backgroundColor: "green",
						borderRadius: "10px",
						border: "1px solid rgba(27, 31, 35, 0.15)",
						color: "whitesmoke",
						fontFamily:
							"-apple-system,system-ui,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
						fontSize: "14px",
						fontWeight: "500",
						lineHeight: "20px",
						margin: 0,
						padding: "10px 12px",
						textAlign: "center",
					}}
					onClick={logout}
				>
					Logout of spotify
				</button>
			)}

			{loading ? (
				<span style={{ textAlign: "center" }}>Loading...</span>
			) : (
				<ul
					style={{
						display: "flex",
						flexWrap: "wrap",
						listStyle: "none",
					}}
				>
					{getImages()}
				</ul>
			)}
		</div>
	);
};

export default App;
