import React from 'react';
import Btn from './Btn';
import PropTypes from 'prop-types';

export default function AnimationSection({ pref, addValue, onClick }) {
  AnimationSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
    onClick: PropTypes.func,
  };

  return (
    <fieldset className="field__animation">
      <legend>Animation</legend>
      <div>
        <label htmlFor="an_start">Start:</label>
        <input
          className="input--num"
          id="an_start"
          type="number"
          value={pref.an.start}
          onChange={e => addValue({ start: +e.target.value }, 'an')}
        />
      </div>
      <div>
        <label htmlFor="an_end">End:</label>
        <input
          className="input--num"
          id="an_end"
          type="number"
          value={pref.an.end}
          onChange={e => addValue({ end: +e.target.value }, 'an')}
        />
      </div>
      <Btn value="Render" className="btn btn--animation" onClick={onClick} />
    </fieldset>
  );
}
