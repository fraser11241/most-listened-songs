import React from "react";
import {
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Slide,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// TODO remove as duplicate in SpotifyItem
const getContentForItem = (item) => {
	const showSubtitle = !!item.artists;
	return {
		id: item.id,
		imageUrl: item.image.url,
		title: item.name,
		previewUrl: item.preview_url,
		...(showSubtitle && {
			subtitle: item.artists.map((artist) => artist.name).join(", "),
		}),
	};
};

const SpotifyItemGridView = ({ items, showImageCaption }) => {
	// const extraSmall = useMediaQuery('max-width:300px');
	const extraSmall = useMediaQuery("(min-width:600px)");
	const small = useMediaQuery("(min-width:768px)");
	const medium = useMediaQuery("(min-width:982px)");
	const large = useMediaQuery("(min-width:992px)");

	const getNumberColumns = () => {
		if (large) return 5;
		else if (medium) return 4;
		else if (small) return 3;
		else if (extraSmall) return 2;
		else return 1;
	};

	return (
		<div>
			<ImageList gap={8} cols={getNumberColumns()}>
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
