import React from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Fab,
	Paper,
	Slide,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import AddIcon from "@mui/icons-material/Add";

const BottomNav = ({
	showGridView,
	setShowGridView,
	showCreatePlaylistModal,
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				position: "sticky",
				bottom: 0,
				left: 0,
				right: 0,
			}}
		>
			<Fab
				color="primary"
				size="medium"
				sx={{
					margin: "auto",
					marginBottom: "10px",
				}}
				variant="extended"
				onClick={showCreatePlaylistModal}
			>
				Create Playlist
				<AddIcon />
			</Fab>
			<Slide in="true" direction="up" unmountOnExit>
				<Paper elevation={3}>
					<BottomNavigation
						showLabels
						value={showGridView}
						onChange={(event, newValue) => {
							setShowGridView(newValue);
						}}
					>
						<BottomNavigationAction
							value={false}
							label="List View"
							icon={<TableRowsIcon />}
						/>
						<BottomNavigationAction
							value={true}
							label="Grid View"
							icon={<AppsIcon />}
						/>
					</BottomNavigation>
				</Paper>
			</Slide>
		</div>
	);
};

export default BottomNav;
