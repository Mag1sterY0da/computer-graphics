import React from 'react';
import PropTypes from 'prop-types';

export default function LandslidePictureSection({ pref, addValue }) {
  LandslidePictureSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__landslide__pic">
      <legend>Landslide Picture</legend>
      <div>
        <label htmlFor="land_x">X</label>
        <input
          className="input--num"
          id="land_x"
          type="number"
          value={pref.lsPicture.x}
          onChange={e => addValue({ x: +e.target.value }, 'lsPicture')}
        />
      </div>
      <div>
        <label htmlFor="land_y">Y</label>
        <input
          className="input--num"
          id="land_y"
          type="number"
          value={pref.lsPicture.y}
          onChange={e => addValue({ y: +e.target.value }, 'lsPicture')}
        />
      </div>
    </fieldset>
  );
}
