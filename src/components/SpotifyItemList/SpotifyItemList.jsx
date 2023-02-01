import {
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import SpotifyItem from "../SpotifyItem/SpotifyItem";
import SpotifyItemSkeletonLoading from "../SpotifyItemSkeletonLoading/SpotifyItemSkeletonLoading";

import "./SpotifyItemList.scss";

const SkeletonLoadingItems = () =>
    [...Array(10)].map(() => (
        <li>
            <SpotifyItemSkeletonLoading />
        </li>
    ));

// TODO remove as duplicate in SpotifyItem
const getContentForItem = (item) => {
    const showSubtitle = !!item.artists;

    return {
        imageUrl: item.image.url,
        title: item.name,
        ...(showSubtitle && {
            subtitle: item.artists.map((artist) => artist.name).join(", "),
        }),
    };
};
const ImageGrid = ({ items }) => {
    return (
        <div>
            <ImageList className="image-grid" gap={8}>
                {items.map((item) => {
                    const { title, subtitle, imageUrl } =
                        getContentForItem(item);

                    return (
                        <ImageListItem>
                            <img src={imageUrl} alt={title} />
                            <ImageListItemBar
                                title={title}
                                subtitle={<span>{subtitle}</span>}
                                // position="below"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </div>

    );
};

const SpotifyItemList = ({ items, createPlaylist, isLoading }) => {
    const asGrid = true;
    return asGrid ? (
        <ImageGrid items={items} />
    ) : (
        <div>
            <ol className="spotify-item-list">
                {isLoading && <SkeletonLoadingItems />}

                {!isLoading &&
                    items.map((item) => {
                        return (
                            <li>
                                <SpotifyItem item={item} />
                            </li>
                        );
                    })}
            </ol>

            {!isLoading && (
                <div className="create-playlist-button-container">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ marginBottom: (theme) => theme.spacing(1) }}
                        onClick={createPlaylist}
                    >
                        Create Playlist
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SpotifyItemList;
