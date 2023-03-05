import React from "react";
import {
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Slide,
} from "@mui/material";

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

/*
@media only screen and (max-width: 300px) {
	.image-grid {
		grid-template-columns: repeat(2, 1fr) !important;
	}
}
*/
const SpotifyItemGridView = ({ items, showImageCaption }) => {
	return (
		<div className="image-grid">
			<ImageList className="image-grid" gap={8} sx={{}}>
				{items.map((item) => {
					const { title, subtitle, imageUrl, id } =
						getContentForItem(item);
					return (
						<ImageListItem key={id}>
							<img src={imageUrl} alt={title} />
							<Slide in={showImageCaption} direction="up">
								<ImageListItemBar
									title={title}
									subtitle={<span>{subtitle}</span>}
								/>
							</Slide>
						</ImageListItem>
					);
				})}
			</ImageList>
		</div>
	);
};

export default SpotifyItemGridView;
