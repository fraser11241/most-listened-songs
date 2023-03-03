import { Tab, Tabs } from "@mui/material";
import React from "react";
import { SpotifyItemTypes } from "../../enums/enums";

import "./SpotifyItemListNavbar.scss";

const SpotifyItemListNavbar = ({ currentItemType, setCurrentItemType }) => {
	const navbarContent = {
		[SpotifyItemTypes.ARTIST]: "Artists",
		[SpotifyItemTypes.TOP_TRACK]: "Tracks",
		[SpotifyItemTypes.RECENT_TRACK]: "Recent",
	};

	return (
		<header className="navbar-wrapper">
			<div className="navbar-button-container">
				<Tabs
					value={currentItemType}
					variant="scrollable"
					allowScrollButtonsMobile={true}
				>
					{Object.entries(navbarContent).map(
						([value, text], index) => (
							<Tab
								key={index}
								tabIndex={0}
								onClick={() => setCurrentItemType(+value)}
								value={+value}
								label={text}
							/>
						)
					)}
				</Tabs>
			</div>
		</header>
	);
};

export default SpotifyItemListNavbar;
