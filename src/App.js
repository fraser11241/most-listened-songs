import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
	const [token, setToken] = useState("");
	const [displayData, setDisplayData] = useState("");
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

		fetchUserTopTracks();
	}, []);

	const getEndpoint = async (path, method = "GET") => {
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
	};

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	const fetchUserTopTracks = async (limit = 50) => {
		/**
		 * https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=long_term
		 * https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=long_term
		 *
		 */
		const { items } = await getEndpoint(
			`me/player/recently-played?limit=${limit}`
		);

		setImages(items.map((item) => item.track.album.images[0] || undefined));
		setDisplayData(items.map((item) => item.track.name));
	};

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

			<ul
				style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}
			>
				{images.map(({ url }) => (
					<li style={{ height: "40vh", flexGrow: "1" }}>
						<img
							src={url}
							style={{
								maxHeight: "100%",
								minWidth: "100%",
								// objectFit: "cover",
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
