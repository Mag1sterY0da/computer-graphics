import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectiveSection({ pref, addValue }) {
  ProjectiveSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__projective">
      <legend>Projective</legend>
      {Object.keys(pref.pro).map((key) => {
        return (
          <div key={key}>
            <label htmlFor={key}>
              {key.startsWith('w')
                ? key[0] + key[1].toUpperCase()
                : key[0].toUpperCase() + key[1]}
            </label>
            <input
              className="input--num"
              id={key}
              type="number"
              value={pref.pro[key]}
              onChange={(e) => addValue({ [key]: +e.target.value }, 'pro')}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
