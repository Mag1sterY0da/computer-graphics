import React from 'react';
import PropTypes from 'prop-types';

export default function LandslideSection({ pref, addValue }) {
  LandslideSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__landslide">
      <legend>Landslide</legend>
      <div>
        <label htmlFor="land_x">X:</label>
        <input
          className="input--num"
          id="land_x"
          type="number"
          value={pref.ls.x}
          onChange={(e) => addValue({ x: +e.target.value }, 'ls')}
        />
      </div>
      <div>
        <label htmlFor="land_y">Y:</label>
        <input
          className="input--num"
          id="land_y"
          type="number"
          value={pref.ls.y}
          onChange={(e) => addValue({ y: +e.target.value }, 'ls')}
        />
      </div>
    </fieldset>
  );
}
