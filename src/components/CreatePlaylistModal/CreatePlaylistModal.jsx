import React, { useState, useEffect } from "react";

import Accordion from "../Accordion/Accordion";
import SongsInPlaylistSelection from "../SongsInPlaylistSelection/SongsInPlaylistSelection";
import { createPlaylistFromSpotifyItems } from "../../requests/playlist";
import TextField from "../TextField/TextField";
import { createMessageObject } from "../SpotifyMostListened/SpotifyMostListened";
import { MessageState } from "../../enums/enums";

import "./CreatePlaylistModal.scss";

const CreatePlaylistModal = ({
  token,
  userId,
  handleCloseModal,
  getCurrentItemsForPlaylist,
  showMessage,
}) => {
  const [itemsInPlaylist, setItemsInPlaylist] = useState();
  const [playlistName, setPlaylistName] = useState("Playlist Name");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const spotifyItemsToIncludeInPlaylist = itemsInPlaylist.reduce(
        (arr, { item, isIncludedInPlaylist }) => {
          if (isIncludedInPlaylist) {
            return [...arr, item];
          } else {
            return arr;
          }
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
        showMessage("Playlist created sucessfully", MessageState.SUCCESS, {
          playlistLink: createdPlaylistUri,
        });
      } else {
        throw new Error("No playlist created");
      }
    } catch (e) {
      console.error(e);
      showMessage("Error creating playlist", MessageState.ERROR);
    }
    handleCloseModal();
  };

  const toggleIsIncludedInPlaylist = (index) => {
    setItemsInPlaylist(
      itemsInPlaylist.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return {
            ...item,
          };
        }
        return {
          ...item,
          isIncludedInPlaylist: !item.isIncludedInPlaylist,
        };
      })
    );
  };

  const deselectAll = () => {
    setItemsInPlaylist(
      itemsInPlaylist.map((item) => {
        return {
          ...item,
          isIncludedInPlaylist: false,
        };
      })
    );
  };

  const selectAll = () => {
    setItemsInPlaylist(
      itemsInPlaylist.map((item) => {
        return {
          ...item,
          isIncludedInPlaylist: true,
        };
      })
    );
  };

  useEffect(() => {
    Promise.resolve(getCurrentItemsForPlaylist()).then((items) => {
      setItemsInPlaylist(
        items.map((item) => {
          return {
            item,
            isIncludedInPlaylist: true,
          };
        })
      );
    });
  }, [getCurrentItemsForPlaylist]);

  return (
    <div className="modal create-playlist-modal is-active">
      <div className="modal-background" />
      <form className="modal-card" onSubmit={handleSubmit}>
        <header className="modal-card-head">
          <p className="modal-card-title">Create Playlist With Songs?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModal}
            type="button"
          />
        </header>

        <section className="modal-card-body">
          <TextField
            label="Playlist Name"
            placeholder={"Playlist Name"}
            value={playlistName}
            setValue={(e) => setPlaylistName(e.target.value)}
          />
          <TextField
            label="Playlist Description"
            placeholder={"Playlist Description"}
            value={playlistDescription}
            setValue={(e) => setPlaylistDescription(e.target.value)}
          />

          <Accordion isOpenByDefault={true}>
            {itemsInPlaylist && (
              <SongsInPlaylistSelection
                itemsInPlaylist={itemsInPlaylist}
                toggleIsIncludedInPlaylist={toggleIsIncludedInPlaylist}
                deselectAll={deselectAll}
                selectAll={selectAll}
              />
            )}
          </Accordion>
        </section>

        <footer className="modal-card-foot">
          <button className="button" onClick={handleCloseModal} type="button">
            Cancel
          </button>
          <button className="button is-success" type="submit">
            Create Playlist
          </button>
        </footer>
      </form>
    </div>
  );
};

export default CreatePlaylistModal;
