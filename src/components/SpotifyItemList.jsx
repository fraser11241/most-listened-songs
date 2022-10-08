import React from "react";

import SpotifyItem from "./SpotifyItem";
import { SpotifyItemTypes } from "../enums/SpotifyItemTypes";

import "./SpotifyItemList.css";

const SpotifyItemList = ({ items, type }) => {
	const getContentForItem = (item, type) => {
		if (
			type === SpotifyItemTypes.RECENT_TRACK ||
			type === SpotifyItemTypes.TOP_TRACK
		) {
			return {
				imageUrl: item.image.url,
				title: item.name,
				subtitle: item.artists.map((artist) => artist.name).join(", "),
			};
		} else if (type === SpotifyItemTypes.ARTIST) {
			return {
				imageUrl: item.image.url,
				title: item.name,
			};
		}
	};

	return (
		<ol className="spotify-item-list">
			{items.map((item, index) => {
				const content = getContentForItem(item, type);
				console.log("ITEMS", items, content);
				return (
					// <a>
					<li>
						{/* <span className="list-position-indicator">{index}</span> */}
						<SpotifyItem {...content} />
					</li>
					// </a>
				);
			})}
		</ol>
	);
};

export default SpotifyItemList;
