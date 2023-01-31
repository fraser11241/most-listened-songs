import React, { useState, useEffect } from "react";

import EmptyIndicator from "../EmptyIndicator/EmptyIndicator";
import SpotifyItemList from "../SpotifyItemList/SpotifyItemList";

import "./SpotifyItemListPanel.scss";

const SpotifyItemListPanel = ({
	items,
	title,
	createPlaylist,
	isError,
	isLoading,
}) => {
	const isEmpty = !isError && !items.length && !isLoading;

	return (
		<div className="spotify-item-list-panel">
			<div class="header-wrapper">{title && <h2>{title}</h2>}</div>
			{isEmpty ? (
				<EmptyIndicator />
			) : (
				<SpotifyItemList
					items={items}
					createPlaylist={createPlaylist}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};

export default SpotifyItemListPanel;
