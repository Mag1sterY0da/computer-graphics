import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectionSection({ pref, addValue }) {
  ProjectionSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  const onChange = e => {
    const obj = pref.projection;
    for (const k in obj) {
      obj[k] = k === e.target.value;
    }
    addValue({ ...obj }, 'projection');
  };

  return (
    <fieldset className="field__projection">
      <legend>Projection</legend>
      <div
        // onChange={e => addValue({ selected: +e.target.value }, 'projection')}
        className={'inputs--radio'}
      >
        {Object.keys(pref.projection).map(key => {
          return (
            <div key={key}>
              <input
                type="radio"
                name={'projection'}
                id={key}
                value={key}
                checked={pref.projection[key]}
                onChange={e => onChange(e, key)}
              />
              <label htmlFor={key}>{key.toUpperCase()}</label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
