import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

// TODO move into utils
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

const styles = {
	itemContainer: {
		height: "70px",
		display: "inline-flex",
		width: "100%",
		alignItems: "center",
		"& img": {
			display: "inline-block",
			aspectRatio: 1,
			objectFit: "cover",
			height: "100%",
			marginRight: "10px",
			width: "auto",
			alignSelf: "center",
			borderRadius: "6px",
			boxShadow: "inset 0 0 0 1px hsla(0, 0%, 0%, 0.1)",
		},
	},
	textContainer: {
		display: "inline-flex",
		maxWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		overflow: "auto",
	},
};

const SpotifyItem = ({ item, children, styles: stylesProp }) => {
	const { title, subtitle, imageUrl } = getContentForItem(item);

	return (
		<Box sx={{ ...styles.itemContainer, ...(stylesProp || {}) }}>
			<img
				className="spotify-item-image"
				src={imageUrl}
				alt={title}
				loading="lazy"
			/>
			<Box sx={styles.textContainer}>
				<Typography component={"span"} variant="body1" noWrap>
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="#424242" noWrap>
						{subtitle}
					</Typography>
				)}
			</Box>
			{children}
		</Box>
	);
};

export default SpotifyItem;
