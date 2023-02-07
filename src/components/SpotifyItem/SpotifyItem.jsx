import {
	List,
	ListItem,
	ListItemAvatar,
	Typography,
	Avatar,
	Divider,
	ListItemText,
} from "@mui/material";
import React from "react";

import "./SpotifyItem.scss";

const getContentForItem = (item) => {
	const showSubtitle = !!item.artists;

	return {
		imageUrl: item.image.url,
		title: item.name,
		...(showSubtitle && {
			subtitle: item.artists.map((artist) => artist.name).join(", "),
		}),
	};
};

const SpotifyItem = ({ item, toggleButton, children }) => {
	const { title, subtitle, imageUrl } = getContentForItem(item);

	return (
		<div className="spotify-item-container">
			<img className="spotify-item-image" src={imageUrl} alt={title} />

			<div className="text-container">
				<Typography component={"span"} variant="body1">
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="#424242">
						{subtitle}
					</Typography>
				)}
			</div>

			{children}
		</div>
	);
};

export default SpotifyItem;
