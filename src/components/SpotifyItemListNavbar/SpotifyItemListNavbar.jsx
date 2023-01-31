import React from "react";
import { SpotifyItemTypes } from "../../enums/enums";

import "./SpotifyItemListNavbar.scss";

const SpotifyItemListNavbar = ({ currentItemType, setCurrentItemType }) => {
	const navbarContent = {
		[SpotifyItemTypes.ARTIST]: "Top Artists",
		[SpotifyItemTypes.TOP_TRACK]: "Top Tracks",
		[SpotifyItemTypes.RECENT_TRACK]: "Recent Tracks",
	};

	return (
		<div className="navbar-wrapper">
			<div className="navbar-item-list">
				{Object.entries(navbarContent).map(([value, text]) => (
					<button
						className={`navbar-item ${
							value === currentItemType ? "current" : ""
						}`}
						onClick={() => setCurrentItemType(+value)}
					>
						{text}
					</button>
				))}
			</div>
		</div>
	);
};

export default SpotifyItemListNavbar;
