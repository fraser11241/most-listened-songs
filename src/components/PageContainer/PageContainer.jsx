import React from "react";

import "./PageContainer.scss";

const PageContainer = ({ children }) => {
	return <div className="page-wrapper">{children}</div>;
};

export default PageContainer;
