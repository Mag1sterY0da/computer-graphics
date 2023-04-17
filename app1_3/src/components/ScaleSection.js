import React from 'react';
import PropTypes from 'prop-types';

export default function ScaleSection({ pref, addValue }) {
  ScaleSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func
  };

  return (
    <fieldset className="field__scale">
      <legend>Scale</legend>
      <div>
        <label htmlFor="px">px/cm</label>
        <input
          className="input--num"
          id="px"
          type="number"
          value={pref.cellSize}
          onChange={(e) => addValue({ cellSize: +e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="cn">Cell Num</label>
        <input
          className="input--num"
          id="cn"
          type="number"
          value={pref.cellNum}
          onChange={(e) => addValue({ cellNum: +e.target.value })}
        />
      </div>
    </fieldset>
  );
}
