import React from 'react';

import './ToggleSwitch.scss';

const ToggleSwitch = ({checked, setChecked, onChange}) => {
    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    return (
        <label className="switch">
            <input 
                className="checkbox" 
                type="checkbox" 
                onChange={onChange || handleChange} 
                checked={checked}
            />
            <span className="slider"/>
        </label>
    )
}

export default ToggleSwitch;