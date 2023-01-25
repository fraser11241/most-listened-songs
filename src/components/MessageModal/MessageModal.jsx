import React from "react";
import { MessageState } from "../../enums/enums";

import "./MessageModal.scss";

const SuccessIcon = () => (
    <div class="success-icon-container">
        <div class="success-icon">
            <div class="success-icon__tip" />
            <div class="success-icon__long" />
        </div>
    </div>
);

const MessageModal = ({ handleCloseModal, message }) => {
    const { message: messageText, state } = message;
    return (
        <div
            className={`modal message-modal is-active ${
                state === MessageState.ERROR ? "error" : ""
            }`}
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{state !== MessageState.ERROR ? messageText : "Error"}</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={handleCloseModal}
                        type="button"
                    />
                </header>

                <section class="modal-card-body">
                    {state === MessageState.SUCCESS && <SuccessIcon />}
                    {state === MessageState.ERROR && <div className="title is-5 has-text-danger has-text-centered">{messageText}</div>}
                </section>

                <footer class="modal-card-foot is-inline has-text-centered">
                    <button
                        class="button is-success"
                        onClick={handleCloseModal}
                        type="button"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default MessageModal;
