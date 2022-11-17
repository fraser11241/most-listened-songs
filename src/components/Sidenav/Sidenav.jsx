import React from "react";

import "./Sidenav.scss";

const Sidenav = ({ children }) => {
    return (
        <>
            <div className="sidenav">
                    {children}
            </div>
        </>
    );
};

export default Sidenav;
