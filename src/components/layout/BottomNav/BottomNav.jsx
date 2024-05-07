import React from "react";

import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import AddIcon from "@mui/icons-material/Add";

const BottomNav = ({
  showGridView,
  setShowGridView,
  showCreatePlaylistModal,
}) => {
  const iconButtonClasses =
    "btn inline-flex items-center justify-center relative bg-transparent outline-none border-0 m-0 rounded-md align-middle flex-col leading-[0] font-light w-32";

  const isListView = !showGridView;
  const isGridView = showGridView;

  return (
    <div className="flex flex-col sticky bottom-0 left-0 right">
      <button
        className="btn btn-primary text-lg m-auto mb-1 opacity-90 rounded-3xl"
        onClick={showCreatePlaylistModal}
      >
        Create Playlist
        <AddIcon />
      </button>

      <div
        className="bg-base-100 pt-1 rounded-sm shadow-sm flex justify-center"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
        }}
      >
        <button
          className={`${iconButtonClasses} ${
            isGridView ? "text-secondary" : ""
          }`}
          onClick={() => setShowGridView(true)}
        >
          <AppsIcon />
          <span className={`${isGridView ? "font-bold" : "font-light"} pb-3`}>
            Grid View
          </span>
        </button>
        <button
          className={`${iconButtonClasses} ${
            isListView ? "text-secondary" : ""
          }`}
          onClick={() => setShowGridView(false)}
        >
          <TableRowsIcon />
          <span className={`${isListView ? "font-bold" : "font-light"} pb-3`}>
            List View
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
