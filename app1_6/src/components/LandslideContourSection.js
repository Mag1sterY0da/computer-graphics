import React from 'react';
import PropTypes from 'prop-types';

export default function LandslideContourSection({ pref, addValue }) {
  LandslideContourSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__landslide">
      <legend>Landslide Contour</legend>
      <div>
        <label htmlFor="land_x">X</label>
        <input
          className="input--num"
          id="land_x"
          type="number"
          value={pref.lsContour.x}
          onChange={e => addValue({ x: +e.target.value }, 'lsContour')}
        />
      </div>
      <div>
        <label htmlFor="land_y">Y</label>
        <input
          className="input--num"
          id="land_y"
          type="number"
          value={pref.lsContour.y}
          onChange={e => addValue({ y: +e.target.value }, 'lsContour')}
        />
      </div>
      <div>
        <label htmlFor="land_z">Z</label>
        <input
          className="input--num"
          id="land_z"
          type="number"
          value={pref.lsContour.z}
          onChange={e => addValue({ z: +e.target.value }, 'lsContour')}
        />
      </div>
    </fieldset>
  );
}
