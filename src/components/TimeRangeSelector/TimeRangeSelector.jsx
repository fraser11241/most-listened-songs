import { buttonUnstyledClasses } from "@mui/base";
import { Button } from "@mui/material";
import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { TimeRanges } from "../../enums/enums";

const TimeRangeSelector = ({ timeRange, setTimeRange }) => {
	const timeRangeText = {
		[TimeRanges.LONG_TERM]: "All Time",
		[TimeRanges.MEDIUM_TERM]: "6 months",
		[TimeRanges.SHORT_TERM]: "Recent",
	};

	console.log("TIME RANGE", timeRange);
	console.log(timeRangeText);
	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
			}}
		>
			{Object.entries(timeRangeText).map(([value, text]) => (
				<Button
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
