import React from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

// TODO remove as duplicate in SpotifyItem
const getContentForItem = (item) => {
	const showSubtitle = !!item.artists;

	return {
		imageUrl: item.image.url,
		title: item.name,
		previewUrl: item.preview_url,
		...(showSubtitle && {
			subtitle: item.artists.map((artist) => artist.name).join(", "),
		}),
	};
};

const SpotifyItemGridView = ({ items, showImageCaption }) => {
	return (
		<div className="image-grid">
			<ImageList className="image-grid" gap={8}>
				{items.map((item) => {
					const { title, subtitle, imageUrl, id } =
						getContentForItem(item);
					return (
						<ImageListItem
							key={id}
							className={
								!showImageCaption && "hide-image-caption"
							}
						>
							<img
								className="grid-image"
								src={imageUrl}
								alt={title}
							/>
							<ImageListItemBar
								title={title}
								subtitle={<span>{subtitle}</span>}
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		</div>
	);
};

export default SpotifyItemGridView;
