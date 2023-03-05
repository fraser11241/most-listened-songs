import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ErrorToast = ({
	message,
	open,
	handleClose,
	actions,
	autoHideDuration,
}) => {
	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			anchorOrigin={{ horizontal: "right", vertical: "top" }}
			autoHideDuration={autoHideDuration}
			actions={actions}
		>
			<Alert elevation={5} onClose={handleClose} severity="error">
				{message}
			</Alert>
		</Snackbar>
	);
};

export default ErrorToast;
