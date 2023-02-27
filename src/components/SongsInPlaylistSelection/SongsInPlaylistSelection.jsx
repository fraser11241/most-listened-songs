import React, { useState } from "react";
import { Button, Slider, Switch, Typography } from "@mui/material";
import SpotifyItem from "../SpotifyItem/SpotifyItem";

import "./SongsInPlaylistSelection.scss";
import { SpotifyItemTypes } from "../../enums/enums";

const SongsInPlaylistSelection = ({
    toggleIsIncludedInPlaylist,
    itemsInPlaylist,
    deselectAll,
    selectAll,
	numSongsFromArtist,
    setNumSongsFromArtist,
    itemType
}) => {
	const [sliderValue, setSliderValue] = useState(numSongsFromArtist);

    return (
        itemsInPlaylist && (
            <div className="songs-in-playlist-selection">
                <div style={{ marginTop: "20px" }} className="select">
                    <Typography variant="body1" fontWeight={"bolder"}>
                        Items Per Artist
                    </Typography>
                    {
                        itemType === SpotifyItemTypes.ARTIST && <Slider
                        gutterbottom
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={10}
                        value={sliderValue}
                        onChange={(e) => {setSliderValue(e.target.value)}}
                        onChangeCommitted={(e) => {setNumSongsFromArtist(sliderValue)}}
                    />
}
                </div>

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={selectAll} type="button" variant="text">
                        Select all
                    </Button>
                    <Button onClick={deselectAll} type="button" variant="text">
                        Deselect all
                    </Button>
                </div>

                <ol className="songs-in-playlist-selection">
                    {itemsInPlaylist.map(
                        ({ item, isIncludedInPlaylist }, index) => (
                            <li>
                                <label
                                    className={`spotify-item-checkbox-container ${
                                        isIncludedInPlaylist
                                            ? "included"
                                            : "not-included"
                                    }`}
                                >
                                    <SpotifyItem item={item}>
                                        <Switch
                                            sx={{ marginLeft: "auto" }}
                                            checked={isIncludedInPlaylist}
                                            onChange={() =>
                                                toggleIsIncludedInPlaylist(
                                                    index
                                                )
                                            }
                                        />
                                    </SpotifyItem>
                                </label>
                            </li>
                        )
                    )}
                </ol>
            </div>
        )
    );
};

export default SongsInPlaylistSelection;
