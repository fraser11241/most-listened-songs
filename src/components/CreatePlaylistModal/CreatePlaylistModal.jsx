import React, { useState, useEffect } from "react";
import Accordion from "../Accordion/Accordion";
import SongsInPlaylistSelection from "../SongsInPlaylistSelection/SongsInPlaylistSelection";
import {createPlaylistFromSpotifyItems} from '../../requests/playlist';

import './CreatePlaylistModal.scss';
import TextField from "../TextField/TextField";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const CreatePlaylistModal = ({token, userId, isOpen, handleCloseModal, getCurrentItemsForPlaylist}) => {
    const [itemsInPlaylist, setItemsInPlaylist] = useState();
    const [playlistName, setPlaylistName] = useState("Playlist Name");
    const [playlistDescription, setPlaylistDescription] = useState("");

    /**
     * // TODO Add input fields for name 
     */
    const handleSubmit = () => {
        const spotifyItemsToIncludeInPlaylist = itemsInPlaylist.reduce((arr, {item, isIncludedInPlaylist}) => {
            if(isIncludedInPlaylist) {
                return [...arr, item];
            }
            else {
                return arr;
            }
        }, []);

        createPlaylistFromSpotifyItems(token, userId, playlistName || 'Playlist Name', playlistDescription || '', spotifyItemsToIncludeInPlaylist)
    };

    const toggleIsIncludedInPlaylist = (index) => {
        setItemsInPlaylist(
            itemsInPlaylist.map((item, itemIndex) => {
                if(itemIndex !== index) {
                    return {
                        ...item, 
                        }
                }
                return {
                    ...item,
                    isIncludedInPlaylist: !item.isIncludedInPlaylist
                }
            })
        )
    }

    useEffect(() => {
        if(isOpen) {
            Promise.resolve(getCurrentItemsForPlaylist()).then(items => {
                setItemsInPlaylist(items.map(item => {
                    return {
                        item, 
                        isIncludedInPlaylist: true
                    }
                }))
            })
        }
    }, [isOpen, getCurrentItemsForPlaylist]);

    return (
        <div className={`modal ${isOpen ? 'is-active': ''}`}>
            <div className="modal-background" />
            <form className="modal-card" onSubmit={handleSubmit}> 
                <header className="modal-card-head">
                    <p className="modal-card-title">Create Playlist With Songs?</p>
                    <button className="delete" aria-label="close" onClick={handleCloseModal} type="button"></button>
                </header>

                <section class="modal-card-body">
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

                    <Accordion>
                        {
                            itemsInPlaylist && <SongsInPlaylistSelection itemsInPlaylist={itemsInPlaylist} toggleIsIncludedInPlaylist={toggleIsIncludedInPlaylist} />
                        }
                    </Accordion>
                </section>
                
                <footer class="modal-card-foot">
                    <button class="button" onClick={handleCloseModal} type="button">Cancel</button>
                    <button class="button is-success" type="submit">Create Playlist</button>
                </footer>
            </form>
        </div>
    );
};

export default CreatePlaylistModal;
