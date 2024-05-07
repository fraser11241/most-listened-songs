import React from "react";

import SpotifyItem from "components/mostListened/SpotifyItem/SpotifyItem";

const SpotifyItemListView = ({ items, isLoading }) => {
  return (
    <ul className="flex flex-col max-w-full bg-base-200">
      {!isLoading &&
        items.map((item, index) => (
          <SpotifyItem
            key={`${item.title} ${item.subtitle} ${index}`}
            item={item}
          />
        ))}
    </ul>
  );
};

export default SpotifyItemListView;
