import React, { useState } from "react";

import { SpotifyItemTypes } from "config/enums";
import EmptyIndicator from "components/common/EmptyIndicator/EmptyIndicator";
import TimeRangeSelector from "components/forms/TimeRangeSelector/TimeRangeSelector";
import SpotifyItemList from "components/mostListened/SpotifyItemList/SpotifyItemList";

const SpotifyItemListPanel = ({
  items,
  title,
  showCreatePlaylistModal,
  isError,
  isLoading,
  timeRange,
  setTimeRange,
  itemType,
}) => {
  const [showAsGrid, setShowAsGrid] = useState(true);
  const [showImageCaption, setShowImageCaption] = useState(false);
  const isEmpty = !isError && !items.length && !isLoading;

  return (
    <div className="rounded-md mt-3 p-2 shadow-sm pb-0 ">
      <div className="flex h-full flex-col">
        <div className="flex justify-between items-center flex-wrap">
          <div
            className="title-and-range-container prose"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            {title && <h2 className="mb-0">{title}</h2>}

            {itemType !== SpotifyItemTypes.RECENT_TRACK && (
              <TimeRangeSelector
                timeRange={timeRange}
                setTimeRange={setTimeRange}
              />
            )}
          </div>

          {showAsGrid && (
            <div class="form-control w-32">
              <label class="label cursor-pointer">
                <span class="label-text">Show Titles</span>
                <input
                  value={showImageCaption}
                  onChange={() => setShowImageCaption(!showImageCaption)}
                  type="checkbox"
                  className="checkbox"
                />
              </label>
            </div>
          )}
        </div>

        {isEmpty ? (
          <EmptyIndicator />
        ) : (
          <SpotifyItemList
            items={items}
            isLoading={isLoading}
            showImageCaption={showImageCaption}
            showAsGrid={showAsGrid}
            setShowAsGrid={setShowAsGrid}
            showCreatePlaylistModal={showCreatePlaylistModal}
          />
        )}
      </div>
    </div>
  );
};

export default SpotifyItemListPanel;
