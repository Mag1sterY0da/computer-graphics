import React from 'react';
import PropTypes from 'prop-types';

export default function TNASection({ pref, addValue }) {
  TNASection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__tan">
      <legend>TNA</legend>
      <div>
        <input
          className="input--num"
          id="phi"
          type="number"
          value={pref.phi}
          onChange={e => addValue({ phi: +e.target.value })}
        />
      </div>
      {Object.keys(pref.tna).map(key => {
        return (
          <div key={key}>
            <input
              type="checkbox"
              id={key}
              onChange={e => addValue({ [key]: e.target.checked }, 'tna')}
              checked={pref.tna[key]}
            />
            <label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
