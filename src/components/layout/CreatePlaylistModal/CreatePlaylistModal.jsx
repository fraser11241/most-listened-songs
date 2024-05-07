import React, { useState, useEffect, useRef } from "react";

import SongsInPlaylistSelection from "components/mostListened/SongsInPlaylistSelection/SongsInPlaylistSelection";
import {
  createPlaylistFromSpotifyItems,
  getGroupedTopSongsFromArtists,
  getPlaylistImage,
} from "requests/playlist";
import { MessageState, SpotifyItemTypes } from "config/enums";
import TopArtistSongSlider from "components/forms/TopArtistSongSliders/TopArtistSongSlider";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const CreatePlaylistModal = ({
  token,
  userId,
  isOpen,
  handleCloseModal,
  items,
  showCreatedPlaylistModal,
  itemType,
  showErrorMessage,
  children,
}) => {
  // const [itemsInPlaylist, setItemsInPlaylist] = useState();
  const [numSongsFromArtist, setNumSongsFromArtist] = useState(5);
  const [numArtists, setNumArtists] = useState(5);
  const [groupedTopSongsFromArtists, setGroupedTopSongsFromArtist] = useState(
    {}
  );
  const playlistNameInput = useRef(null);
  const playlistDescriptionInput = useRef(null);

  const DEFAULT_PLAYLIST_NAME = "Spotify Playlist";
  const MAX_TOP_SONGS_FOR_ARTIST = 10;

  const getItemsInPlaylist = () => {
    if (itemType !== SpotifyItemTypes.ARTIST) {
      return items;
    }

    if (!Object.keys(groupedTopSongsFromArtists).length || !items.length) {
      return [];
    }

    let topSongsMap = groupedTopSongsFromArtists;
    const topArtistIds = items.map(({ id }) => id);
    const artistIdsForPlaylist = topArtistIds.slice(0, numArtists);

    const groupedSongsForEachArtist = artistIdsForPlaylist.map((id) =>
      topSongsMap[id].slice(0, numSongsFromArtist)
    );
    const songsForEachArtistFlat = [].concat(...groupedSongsForEachArtist);

    return [...songsForEachArtistFlat];
  };

  const itemsInPlaylist = getItemsInPlaylist();

  const handleCreatingPlaylistError = (e) => {
    console.error("Error occurred while creating playlist", e);

    const errorMessageToDisplay =
      e.message === "Token expired"
        ? "Token has expired"
        : "Error occurred while creating playlist";
    showErrorMessage(errorMessageToDisplay);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const playlistName =
        playlistNameInput?.current?.value || DEFAULT_PLAYLIST_NAME;
      const playlistDescription =
        playlistDescriptionInput?.current?.value || "";

      const songCheckboxes = Array.from(e.target.playlistSong);
      if (!songCheckboxes) {
        throw new Error("No songs to add to playlist");
      }

      const spotifyItemsToIncludeInPlaylist = songCheckboxes.reduce(
        (arr, { checked: isIncluded }, index) => {
          if (isIncluded) {
            return [...arr, itemsInPlaylist[index]];
          }
          return arr;
        },
        []
      );

      const playlistId = await createPlaylistFromSpotifyItems(
        token,
        userId,
        playlistName || "Playlist Name",
        playlistDescription || "",
        spotifyItemsToIncludeInPlaylist
      );

      if (playlistId) {
        const createdPlaylistUri = `spotify:playlist:${playlistId}`;
        const createdPlaylistImage = await getPlaylistImage(token, playlistId);
        showCreatedPlaylistModal(
          "Playlist created sucessfully",
          MessageState.SUCCESS,
          {
            playlistLink: createdPlaylistUri,
            playlistImage:
              createdPlaylistImage.length && createdPlaylistImage[0]?.url,
          }
        );
      } else {
        throw new Error("No playlist created");
      }

      handleCloseModal();
    } catch (e) {
      handleCreatingPlaylistError(e);
    }
  };

  useEffect(() => {
    if (itemType === SpotifyItemTypes.ARTIST) {
      (async () => {
        const topArtistIds = items.map(({ id }) => id);

        const artistsIdsWithMissingSongs = topArtistIds.filter(
          (id) => !(id in groupedTopSongsFromArtists)
        );

        // Get any missing songs
        if (artistsIdsWithMissingSongs.length) {
          const missingSongs = await getGroupedTopSongsFromArtists(
            token,
            artistsIdsWithMissingSongs,
            MAX_TOP_SONGS_FOR_ARTIST
          );
          const newArtistTopSongs = {
            ...groupedTopSongsFromArtists,
            ...missingSongs,
          };
          setGroupedTopSongsFromArtist((current) =>
            Object.keys(current).length < Object.keys(newArtistTopSongs).length
              ? newArtistTopSongs
              : current
          );
        }
      })();
    }
  }, [
    groupedTopSongsFromArtists,
    itemType,
    items,
    numArtists,
    numSongsFromArtist,
    token,
    isOpen,
  ]);

  return (
    <dialog
      id="create-playlist-modal"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="min-w-[100vw] w-screen h-screen max-h-screen p-4 m-0 bg-base-200"
    >
      <form className="prose max-w-full" onSubmit={handleSubmit}>
        <h2 id="dialog-title">Create Playlist</h2>
        <div className="max-w-full">
          <p className="text-lg">
            Enter a name for the created playlist, and customise its songs
            below.
          </p>
          <label
            className={`input input-bordered flex items-center gap-2 max-w-96`}
            name="playlistName"
            autoFocus
            label="Playlist Name"
            required
          >
            <MusicNoteIcon />
            <input
              type="text"
              className="grow"
              placeholder="Enter playlist name..."
              defaultValue={DEFAULT_PLAYLIST_NAME}
              ref={playlistNameInput}
            />
          </label>
          <label
            className="input input-bordered flex items-center gap-2 max-w-96 mt-2"
            name="playlistDescription"
            margin="dense"
            label="Playlist Description"
            fullWidth
          >
            <TextSnippetIcon />
            <input
              type="text"
              className="grow"
              placeholder="Enter playlist description..."
              ref={playlistDescriptionInput}
            />
          </label>

          {itemType === SpotifyItemTypes.ARTIST && (
            <TopArtistSongSlider
              numArtists={numArtists}
              setNumArtists={setNumArtists}
              numSongsFromArtist={numSongsFromArtist}
              setNumSongsFromArtist={setNumSongsFromArtist}
            />
          )}
          <SongsInPlaylistSelection
            key={`${numArtists}-${numSongsFromArtist}`}
            itemsInPlaylist={itemsInPlaylist}
          />
        </div>
        <div className="flex mb-2 justify-center">
          <button className="btn btn-error" type="button">
            Cancel
          </button>
          <button className="btn btn-success ml-2" type="submit">
            Create Playlist
          </button>
        </div>
        {children}
      </form>
    </dialog>
  );
};

export default CreatePlaylistModal;
