import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { MessageState } from "../../config/enums";

import "./MessageModal.scss";

const PlaylistImage = ({ playlistImage, playlistLink }) => (
	<a href={playlistLink}>
		<img style={{ width: "100%" }} src={playlistImage} />
	</a>
);

const MessageModal = ({ handleCloseModal, message, isOpen }) => {
	const {
		message: messageText,
		state,
		playlistLink,
		playlistImage,
	} = message;

	return (
		<Dialog
			open={!!isOpen}
			onClose={handleCloseModal}
			aria-labelledby="dialog-title"
		>
			<DialogTitle id="dialog-title">
				<p className="modal-card-title">{messageText}</p>
			</DialogTitle>
			<DialogContent>
				<section>
					<Typography>
						{state === MessageState.SUCCESS && (
							<PlaylistImage
								playlistImage={playlistImage}
								playlistLink={playlistLink}
							/>
						)}
					</Typography>
				</section>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseModal}>Close</Button>
				{state !== MessageState.ERROR && (
					<Button href={playlistLink}>View Playlist</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default MessageModal;
