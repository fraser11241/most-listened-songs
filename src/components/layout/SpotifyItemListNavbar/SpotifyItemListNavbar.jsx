import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import { SpotifyItemTypes } from "config/enums";

const SpotifyItemListNavbar = ({ currentItemType, setCurrentItemType }) => {
	const navbarContent = {
		[SpotifyItemTypes.ARTIST]: "Artists",
		[SpotifyItemTypes.TOP_TRACK]: "Tracks",
		[SpotifyItemTypes.RECENT_TRACK]: "Recent",
	};

	return (
		<Box
			component="header"
			position="sticky"
			top={0}
			zIndex={10}
			background="transparent"
			className="navbar-wrapper"
		>
			<Box display="flex" justifyContent="center" backgroundColor="white">
				<Tabs
					value={currentItemType}
					variant="scrollable"
					allowScrollButtonsMobile={true}
				>
					{Object.entries(navbarContent).map(
						([value, text], index) => (
							<Tab
								component="button"
								key={index}
								tabIndex={0}
								onClick={() => setCurrentItemType(+value)}
								value={+value}
								label={text}
							/>
						)
					)}
				</Tabs>
			</Box>
		</Box>
	);
};

export default SpotifyItemListNavbar;
