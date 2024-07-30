import React, { useState } from "react";
const Switch = ({ title }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  return (
    <div className="card custom-card">
      <div className="card-body">
        <label className="custom-switch">
          <input
            type="checkbox"
            name="custom-switch-checkbox"
            className="custom-switch-input"
            checked={isChecked}
            onChange={handleChange}
          />
          <span className="custom-switch-indicator"></span>
          <span className="custom-switch-description">{title}</span>
        </label>
      </div>
    </div>
  );
};

export default Switch;
