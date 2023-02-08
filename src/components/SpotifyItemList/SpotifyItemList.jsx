import {
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "../SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";
import BottomNav from "../BottomNav/BottomNav";
import "./SpotifyItemList.scss";

const SkeletonLoadingItems = () =>
	[...Array(10)].map(() => (
		<li>
			<SpotifyItemSkeletonLoading />
		</li>
	));

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

const ImageGrid = ({ items, showImageCaption }) => {
	return (
		<div>
			<ImageList className="image-grid" gap={8}>
				{items.map((item) => {
					const { title, subtitle, imageUrl, previewUrl } =
						getContentForItem(item);
					return (
						<ImageListItem
							className={
								!showImageCaption && "hide-image-caption"
							}
						>
							<img
								sx={{ aspectRatio: 1 }}
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

const SpotifyItemList = ({
	items,
	createPlaylist,
	isLoading,
	showImageCaption,
	showAsGrid,
	setShowAsGrid,
	showCreatePlaylistModal,
}) => {
	return (
		<div>
			{showAsGrid ? (
				<ImageGrid items={items} showImageCaption={showImageCaption} />
			) : (
				<ol className="spotify-item-list">
					{isLoading && <SkeletonLoadingItems />}

					{!isLoading &&
						items.map((item) => {
							return (
								<li>
									<SpotifyItem item={item} />
								</li>
							);
						})}
				</ol>
			)}

			{!isLoading && (
				<BottomNav
					showGridView={showAsGrid}
					setShowGridView={setShowAsGrid}
					showCreatePlaylistModal={showCreatePlaylistModal}
				/>
				// <div className="create-playlist-button-container">
				// 	<Button
				// 		variant="contained"
				// 		startIcon={<AddIcon />}
				// 		sx={{ marginBottom: (theme) => theme.spacing(1) }}
				// 		onClick={createPlaylist}
				// 	>
				// 		Create Playlist
				// 	</Button>
				// </div>
			)}
		</div>
	);
};

export default SpotifyItemList;
