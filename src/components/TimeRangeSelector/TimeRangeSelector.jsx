import React from "react";
import { Button } from "@mui/material";

import { TimeRanges } from "../../config/enums";

const TimeRangeSelector = ({ timeRange, setTimeRange }) => {
	const timeRangeText = {
		[TimeRanges.LONG_TERM]: "All Time",
		[TimeRanges.MEDIUM_TERM]: "6 months",
		[TimeRanges.SHORT_TERM]: "Recent",
	};

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
			}}
		>
			{Object.entries(timeRangeText).map(([value, text], index) => (
				<Button
					key={index}
					className={+value === +timeRange ? "active" : ""}
					sx={{
						color: "gray",
						"&.active": {
							color: "black",
						},
						paddingLeft: 0,
					}}
					disableRipple
					variant="text"
					onClick={() => {
						setTimeRange(value);
					}}
				>
					{text}
				</Button>
			))}
		</div>
	);
};

export default TimeRangeSelector;
