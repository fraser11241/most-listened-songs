import {
    Checkbox,
    Container,
    FormControlLabel,
    Slider,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SpotifyItemTypes } from "../../enums/enums";

import EmptyIndicator from "../EmptyIndicator/EmptyIndicator";
import SpotifyItemList from "../SpotifyItemList/SpotifyItemList";
import TimeRangeSelector from "../TimeRangeSelector/TimeRangeSelector";

import "./SpotifyItemListPanel.scss";

const SpotifyItemListPanel = ({
    items,
    title,
    showCreatePlaylistModal,
    isError,
    isLoading,
    timeRange,
    setTimeRange,
    itemType,
    numArtists,
    setNumArtists,
}) => {
    const [sliderValue, setSliderValue] = useState(numArtists);
    const [showAsGrid, setShowAsGrid] = useState(false);
    const [showImageCaption, setShowImageCaption] = useState(true);
    const isEmpty = !isError && !items.length && !isLoading;

    return (
        <Container maxWidth="md" sx={{ height: 1 }}>
            <div
                className="spotify-item-list-panel"
                style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                }}
            >
                <div
                    className="panel-top-container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        className="title-and-range-container"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "column",
                        }}
                    >
                        {title && (
                            <Typography
                                sx={{
                                    display: "inline",
                                    marginRight: showAsGrid
                                        ? (theme) => theme.spacing(1)
                                        : 0,
                                }}
                                component="h2"
                                variant="h5"
                            >
                                {title}
                            </Typography>
                        )}

                        <TimeRangeSelector
                            timeRange={timeRange}
                            setTimeRange={setTimeRange}
                        />

                        {itemType === SpotifyItemTypes.ARTIST && (
                            <div>
                                <Typography component="p" variant="h6">
                                    Number of Artists
                                </Typography>
                                <Slider
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={1}
                                    max={25}
                                    value={sliderValue}
                                    onChange={(e) =>{
                                        setSliderValue(e.target.value)
									}
                                    }
                                    onChangeCommitted={() => {
                                        setNumArtists(sliderValue);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {showAsGrid && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={showImageCaption}
                                    onChange={() =>
                                        setShowImageCaption(!showImageCaption)
                                    }
                                />
                            }
                            label="Hide Titles"
                        />
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
        </Container>
    );
};

export default SpotifyItemListPanel;
