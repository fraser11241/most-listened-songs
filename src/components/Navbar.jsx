import React from "react";

import "./Navbar.css";
import "./Navbar.queries.css";

const Navbar = ({ buttons }) => {
	return (
		<div className="navbar-wrapper">
			<div className="navbar">
				{buttons.map(({ text, onClick }) => (
					<button onClick={onClick}>{text}</button>
				))}
			</div>
		</div>
	);
};

export default Navbar;
