import React from "react";

import { Box } from "@mui/system";
import { styles as spotifyItemStyles } from "components/mostListened/SpotifyItem/SpotifyItem";

const styles = {
    image: {
        display: "inline-block",
        aspectRatio: "1",
        objectFit: "cover",
        height: "100%",
        marginRight: "10px",
        width: "auto",
        background: "blue",
        animation: "skeleton-loading 1s linear infinite alternate",
        "@keyframes skeleton-loading": {
            "0%": {
                backgroundColor: "hsl(200, 20%, 80%)",
            },
            "100%": {
                backgroundColor: "hsl(200, 20%, 95%)",
            },
        },
    },
    textContainer: {
        width: "90%",
        backgroundColor: "rgb(255, 255, 255)",
        "& > div": {
            height: "20px",
            display: "block",
            animation: "skeleton-loading 1s linear infinite alternate",
        },
    },
    title: {
        width: "40%",
        maxWidth: "150px",
        margin: 0,
        marginBottom: "0.25em",
    },
    subtitle: {
        width: "60%",
        maxWidth: "225px",
    },
};

const SpotifyItemSkeletonLoading = () => {
    const {
        itemContainer: itemContainerStyles,
    } = spotifyItemStyles;

    return (
        <Box sx={itemContainerStyles}>
            <Box sx={styles.image} />

            <Box sx={styles.textContainer}>
                <Box sx={styles.title} />
                <Box sx={styles.subtitle} />
            </Box>
        </Box>
    );
};

export default SpotifyItemSkeletonLoading;
