import React from "react";

import { TimeRanges } from "config/enums";

const TimeRangeSelector = ({ timeRange, setTimeRange }) => {
  const timeRangeText = {
    [TimeRanges.LONG_TERM]: "All Time",
    [TimeRanges.MEDIUM_TERM]: "6 months",
    [TimeRanges.SHORT_TERM]: "Recent",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(timeRangeText).map(([value, text], index) => (
        <button
          key={index}
          className={`${+value === +timeRange ? "font-bold" : ""}`}
          onClick={() => {
            setTimeRange(value);
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
