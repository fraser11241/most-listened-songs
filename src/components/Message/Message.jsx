import React from 'react';

import { MessageState } from '../../enums/enums';

import './Message.scss';

const Message = ({messageText, state}) => {
    const colourMap = {
        [MessageState.SUCCESS]: 'is-success', 
        [MessageState.ERROR]: 'is-error', 
    }

    const colour = state in colourMap ? state[colourMap] : '';

    return (
        <div className="notification">
            <button className="delete" />
            {messageText}
        </div>
    )
};

export default Message;