import React from 'react';
import PropTypes from 'prop-types';

export default function RotationContourSection({ pref, addValue }) {
  RotationContourSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__rotation">
      <legend>Rotation Contour</legend>
      <div>
        <label htmlFor="land_x">X</label>
        <input
          className="input--num"
          id="rot_x"
          type="number"
          value={pref.rContour.x}
          onChange={e => addValue({ x: +e.target.value }, 'rContour')}
        />
      </div>
      <div>
        <label htmlFor="rot_y">Y</label>
        <input
          className="input--num"
          id="rot_y"
          type="number"
          value={pref.rContour.y}
          onChange={e => addValue({ y: +e.target.value }, 'rContour')}
        />
      </div>
      <div>
        <label htmlFor="rot_z">Z</label>
        <input
          className="input--num"
          id="rot_z"
          type="number"
          value={pref.rContour.z}
          onChange={e => addValue({ z: +e.target.value }, 'rContour')}
        />
      </div>
    </fieldset>
  );
}
