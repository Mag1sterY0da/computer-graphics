import React from 'react';
import PropTypes from 'prop-types';

export default function AffineSection({ pref, addValue }) {
  AffineSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__affine">
      <legend>Affine</legend>
      {Object.keys(pref.aff).map((key) => {
        return (
          <div key={key}>
            <label htmlFor={key}>{key[0].toUpperCase() + key[1]}</label>
            <input
              className="input--num"
              id={key}
              type="number"
              value={pref.aff[key]}
              onChange={(e) => addValue({ [key]: +e.target.value }, 'aff')}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
