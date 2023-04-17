import React from 'react';
import PropTypes from 'prop-types';
import { contour } from '../config/contour';

export default function PointSection({ pref, addValue }) {
  PointSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__point">
      <legend>Point</legend>
      <div>
        <label htmlFor="x">X:</label>
        <input
          className="input--num"
          id="x"
          type="number"
          value={pref.p.x}
          onChange={e => addValue({ x: +e.target.value }, 'p')}
        />
      </div>
      <div>
        <label htmlFor="y">Y:</label>
        <input
          className="input--num"
          id="y"
          type="number"
          value={pref.p.y}
          onChange={e => addValue({ y: +e.target.value }, 'p')}
        />
      </div>
      <div>
        <label htmlFor="point">Point:</label>
        <select
          className={'input--num'}
          id={'point'}
          onChange={e =>
            addValue({ selected: contour.movablePoints[+e.target.value] }, 'p')
          }
        >
          {contour.movablePoints.map((p, i) => (
            <option key={i} value={i} name={p.name}>
              {p.name + ', ' + ++i}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}
