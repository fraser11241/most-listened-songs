import React from "react";

const TextField = ({ label, value, setValue, placeholder }) => {
  return (
    <div className="field">
      <label>
        <span className="label">{label}</span>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder={placeholder || ""}
            value={value}
            onChange={setValue}
          />
        </div>
      </label>
    </div>
  );
};

export default TextField;
