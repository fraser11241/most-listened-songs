import React from "react";

import { getContentForItem } from "../SpotifyItem/SpotifyItem";

const SpotifyItemGridView = ({ items, showImageCaption }) => {
  return (
    <div>
      <ul
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-y-auto p-0 bg-base-200`}
      >
        {items.map((item, index) => {
          const { title, subtitle, imageUrl, id, uri } =
            getContentForItem(item);

          return (
            <li
              key={`${id} - ${index}`}
              className="h-auto flex relative flex-col"
            >
              <a
                href={uri}
                className="object-cover w-full h-auto block grow aspect-square m-0"
              >
                <img src={imageUrl} alt={title} />
              </a>
              {showImageCaption && (
                <div className="bg-base-100 p-2 rounded-sm">
                  <p className="p-0 m-0 font-semibold text-base text-nowrap overflow-hidden overflow-ellipsis">
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
