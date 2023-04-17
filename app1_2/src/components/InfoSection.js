import React from 'react';
import PropTypes from 'prop-types';

export default function InfoSection({ pref, addValue }) {
  InfoSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__info">
      <legend>Info</legend>
      <div>
        <label htmlFor="arcLength">Arc Length:</label>
        <input
          className="input--num"
          id="arcLength"
          type="number"
          value={pref.arcLength}
          onChange={e => addValue({ arcLength: +e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="square">Square:</label>
        <input
          className="input--num"
          id="square"
          type="number"
          value={pref.square}
          onChange={e => addValue({ square: +e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="radius">Radius of Curvature:</label>
        <input
          className="input--num"
          id="radius"
          type="number"
          value={pref.radiusOfCurvature}
          onChange={e => addValue({ radiusOfCurvature: +e.target.value })}
        />
      </div>
    </fieldset>
  );
}
