import React from 'react';
import PropTypes from 'prop-types';

export default function LengthSection({ pref, addValue }) {
  LengthSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__length">
      <legend>Length</legend>
      {Object.keys(pref.l).map((key) => {
        return (
          <div key={key}>
            <label htmlFor={key}>{key.toUpperCase()}</label>
            <input
              className="input--num"
              id={key}
              type="number"
              value={pref.l[key]}
              onChange={(e) => addValue({ [key]: +e.target.value }, 'l')}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
