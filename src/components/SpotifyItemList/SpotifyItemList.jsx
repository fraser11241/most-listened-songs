import React from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "../SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";
import BottomNav from "../BottomNav/BottomNav";
import "./SpotifyItemList.scss";
import SpotifyItemGridView from "../SpotifyItemGridView/SpotifyItemGridView";
import SpotifyItemListView from "../SpotifyItemListView/SpotifyItemListView";

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
		<div className="item-list-wrapper">
			{showAsGrid ? (
				<SpotifyItemGridView
					items={items}
					showImageCaption={showImageCaption}
					isLoading={isLoading}
				/>
			) : (
				<SpotifyItemListView items={items} isLoading={isLoading} />
			)}

			{!isLoading && (
				<BottomNav
					showGridView={showAsGrid}
					setShowGridView={setShowAsGrid}
					showCreatePlaylistModal={showCreatePlaylistModal}
				/>
			)}
		</div>
	);
};

export default SpotifyItemList;
