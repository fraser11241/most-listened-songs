import React from "react";

import "./PageContainer.scss";

const PageContainer = ({ children }) => {
  return (
    <div className="container page-wrapper">
      <div className="columns is-fullheight">{children}</div>
    </div>
  );
};

export default PageContainer;
