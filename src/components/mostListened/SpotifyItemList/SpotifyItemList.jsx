import React from "react";
import { Box } from "@mui/system";

import SpotifyItemGridView from "components/mostListened/SpotifyItemGridView/SpotifyItemGridView";
import SpotifyItemListView from "components/mostListened/SpotifyItemListView/SpotifyItemListView";
import BottomNav from "components/layout/BottomNav/BottomNav";

const SpotifyItemList = ({
	items,
	isLoading,
	showImageCaption,
	showAsGrid,
	setShowAsGrid,
	showCreatePlaylistModal,
}) => {
	return (
		<Box
			sx={{
				height: "100%",
				flexDirection: "column",
				display: "flex",
				justifyContent: "space-between",
				flexGrow: "1",
			}}
		>
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
		</Box>
	);
};

export default SpotifyItemList;
