import React from 'react';

import './Sidenav.scss';

const Sidenav = ({buttonContents, buttonOnClicks}) => {
    return (
        <div className="sidenav">
            {buttonContents.map(
                (buttonText, index) => (
                    <button
                        className="button"
                        onClick={buttonOnClicks[index]}
                    >
                        {buttonText}
                    </button>
                )
            )}
        </div>
    )
}

export default Sidenav;
