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
      <legend>Animation and Dots</legend>
      <div>
        <input
          type="checkbox"
          id="showSkeleton"
          onChange={e => addValue({ showSkeleton: e.target.checked }, 'an')}
          checked={pref.an.showSkeleton}
        />
        <label htmlFor="showSkeleton">Skeleton</label>
      </div>
      <Btn value="Render" className="btn btn--animation" onClick={onClick} />
    </fieldset>
  );
}
