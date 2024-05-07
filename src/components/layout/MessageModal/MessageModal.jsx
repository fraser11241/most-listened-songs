import React from "react";

import { MessageState } from "config/enums";

const MessageModal = ({ message }) => {
  const { message: messageText, state, playlistLink, playlistImage } = message;

  return (
    <dialog
      id="message-modal"
      aria-labelledby="dialog-title"
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <form method="dialog">
        <div className="ml-2 mt-2 prose">
          <h2 className="text-lg text-center" id="dialog-title">
            {messageText}
          </h2>
        </div>
        <div>
          <section>
            {state === MessageState.SUCCESS && (
              <a href={playlistLink}>
                <img
                  className="w-full p-2"
                  src={playlistImage}
                  alt="Created playlist"
                />
              </a>
            )}
          </section>
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <button className="btn">Close</button>
          {state !== MessageState.ERROR && (
            <a className="btn btn-primary" href={playlistLink}>
              View Playlist
            </a>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default MessageModal;
