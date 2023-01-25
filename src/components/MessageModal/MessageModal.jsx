import React from "react";
import { MessageState } from "../../enums/enums";

import "./MessageModal.scss";

const SuccessIcon = () => (
    <div className="success-icon-container">
        <div className="success-icon">
            <div className="success-icon__tip" />
            <div className="success-icon__long" />
        </div>
    </div>
);

const MessageModal = ({ handleCloseModal, message }) => {
    const { message: messageText, state, playlistLink } = message;
    return (
        <div
            className={`modal message-modal is-active ${
                state === MessageState.ERROR ? "error" : ""
            }`}
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        {state !== MessageState.ERROR ? messageText : "Error"}
                    </p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={handleCloseModal}
                        type="button"
                    />
                </header>

                <section className="modal-card-body has-text-centered">
                    {state === MessageState.SUCCESS && <SuccessIcon />}
                    {state === MessageState.ERROR && (
                        <div className="title is-5 has-text-danger has-text-centered">
                            {messageText}
                        </div>
                    )}
                </section>

                <footer className="modal-card-foot is-inline has-text-centered">
                    <button
                        className="button is-success"
                        onClick={handleCloseModal}
                        type="button"
                    >
                        Close
                    </button>

                    {playlistLink && (
                        <a className="button is-link" href={playlistLink}>
                            Go to created playlist
                        </a>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default MessageModal;
