import React from 'react';

export default function LightSection({ handleChange, pref }) {
  return (
    <div className="config-field normal">
      <h2>Light</h2>
      <div>
        <input
          type="range"
          className="range-input"
          id="l-x"
          min="0"
          max="20"
          step="1"
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.l.x}
        />
        <label htmlFor="l-x">X</label>
      </div>
      <div>
        <input
          type="range"
          className="range-input"
          id="l-y"
          min="0"
          max="20"
          step="1"
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.l.y}
        />
        <label htmlFor="l-x">Y</label>
      </div>
      <div>
        <input
          type="range"
          className="range-input"
          id="l-z"
          min="0"
          max="20"
          step="1"
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.l.z}
        />
        <label htmlFor="l-x">Z</label>
      </div>
    </div>
  );
}
