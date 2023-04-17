import React from 'react';
import PropTypes from 'prop-types';

export default function RotationPictureSection({ pref, addValue }) {
  RotationPictureSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__rotation__pic">
      <legend>Rotation Contour</legend>
      <div>
        <label htmlFor="land_x">X</label>
        <input
          className="input--num"
          id="rot_x"
          type="number"
          value={pref.rPicture.x}
          onChange={e => addValue({ x: +e.target.value }, 'rPicture')}
        />
      </div>
      <div>
        <label htmlFor="rot_y">Y</label>
        <input
          className="input--num"
          id="rot_y"
          type="number"
          value={pref.rPicture.y}
          onChange={e => addValue({ y: +e.target.value }, 'rPicture')}
        />
      </div>

      <div>
        <label htmlFor="angle">Angle</label>
        <input
          className="input--num"
          id="rot_x"
          type="number"
          value={pref.rPicture.angle}
          onChange={e => addValue({ angle: +e.target.value }, 'rPicture')}
        />
      </div>
    </fieldset>
  );
}
