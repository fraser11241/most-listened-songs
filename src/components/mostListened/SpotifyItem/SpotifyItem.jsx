import React from "react";

export const getContentForItem = (item) => {
  const showSubtitle = !!item.artists;
  return {
    imageUrl: item.image.url,
    title: item.name,
    ...(showSubtitle && {
      subtitle: item.artists.map((artist) => artist.name).join(", "),
    }),
    uri: item.uri,
  };
};

const SpotifyItem = ({ item, children, isStyledAsDisabled }) => {
  const { title, subtitle, imageUrl, uri } = getContentForItem(item);

  return (
    <div
      className={`flex items-center py-1 px-1 rounded-md m-1 prose max-w-full shadow-sm bg-base-100 ${
        isStyledAsDisabled ? "bg-base-300" : ""
      }`}
    >
      <a href={uri} className="aspect-square h-20 object-cover m-0">
        <img className="m-0" src={imageUrl} alt={title} />
      </a>
      <div className="ml-2 overflow-auto w-full">
        <h2 className="m-0 text-nowrap overflow-ellipsis overflow-hidden w-full">
          {title}
        </h2>
        {subtitle && (
          <h3 className="m-0 text-nowrap overflow-ellipsis overflow-hidden">
            {subtitle}
          </h3>
        )}
      </div>
      {children}
    </div>
  );
};

export default SpotifyItem;
