import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";

import { MessageState } from "config/enums";

import "./MessageModal.scss";

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
							<a href={playlistLink}>
								<img
									style={{ width: "100%" }}
									src={playlistImage}
									alt="Created playlist"
								/>
							</a>
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
