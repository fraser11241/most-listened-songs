import React from "react";

import "./PageWrapper.scss";

const PageWrapper = ({ children }) => {
	return (
		<div className="page-wrapper" id="page-wrapper">
			{children}
		</div>
	);
};

export default PageWrapper;
