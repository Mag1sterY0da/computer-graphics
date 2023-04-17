import React from 'react';
import PropTypes from 'prop-types';

export default function ALengthSection({ pref, addValue }) {
  ALengthSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__length">
      <legend>A Length</legend>
      <div>
        <label htmlFor="a">A:</label>
        <input
          className="input--num"
          id="a"
          type="number"
          value={pref.a}
          onChange={e => addValue({ a: +e.target.value })}
        />
      </div>
    </fieldset>
  );
}
