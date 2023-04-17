import React from 'react';
import PropTypes from 'prop-types';

export default function RadiusSection({ pref, addValue }) {
  RadiusSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__radius">
      <legend>Radius</legend>
      {Object.keys(pref.r).map((key) => {
        return (
          <div key={key}>
            <label htmlFor={key}>{key.toUpperCase()}</label>
            <input
              className="input--num"
              id={key}
              type="number"
              value={pref.r[key]}
              onChange={(e) => addValue({ [key]: +e.target.value }, 'r')}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
