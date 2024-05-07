import React from "react";

import { getContentForItem } from "../SpotifyItem/SpotifyItem";

const SpotifyItemGridView = ({ items, showImageCaption }) => {
  return (
    <div>
      <ul
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-y-auto p-0 bg-base-200`}
      >
        {items.map((item) => {
          const { title, subtitle, imageUrl, id } = getContentForItem(item);

          return (
            <li key={id} className="h-auto flex relative flex-col">
              <img
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-auto block grow aspect-square m-0"
              />
              {showImageCaption && (
                <div className="bg-base-100 p-2 rounded-sm">
                  <p className="p-0 m-0 font-semibold text-lg text-nowrap overflow-hidden overflow-ellipsis">
                    {title}
                  </p>
                  {!!subtitle && (
                    <p className="p-0 m-0 font-thin text-sm text-nowrap">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SpotifyItemGridView;
