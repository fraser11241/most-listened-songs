import { Box } from "@mui/system";
import React from "react";

const PageWrapper = ({ children }) => {
	return (
		<Box minHeight="100vh" height="100%" id="page-wrapper">
			{children}
		</Box>
	);
};

export default PageWrapper;
