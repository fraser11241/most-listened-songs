import React from "react";

import SpotifyItemGridView from "components/mostListened/SpotifyItemGridView/SpotifyItemGridView";
import SpotifyItemListView from "components/mostListened/SpotifyItemListView/SpotifyItemListView";
import BottomNav from "components/layout/BottomNav/BottomNav";

const SpotifyItemList = ({
  items,
  isLoading,
  showImageCaption,
  showAsGrid,
  setShowAsGrid,
  showCreatePlaylistModal,
}) => {
  return (
    <div className="w-full">
      {showAsGrid ? (
        <SpotifyItemGridView
          items={items}
          showImageCaption={showImageCaption}
          isLoading={isLoading}
        />
      ) : (
        <SpotifyItemListView items={items} isLoading={isLoading} />
      )}

      {!isLoading && (
        <BottomNav
          showGridView={showAsGrid}
          setShowGridView={setShowAsGrid}
          showCreatePlaylistModal={showCreatePlaylistModal}
        />
      )}
    </div>
  );
};

export default SpotifyItemList;
