import React from 'react';

export default function PolygonalSection({ handleChange, pref }) {
  return (
    <div className='config-field pol'>
      <h2>Polygons</h2>
      <div>
        <input
          type='range'
          className='range-input'
          id='uStep'
          min='0.02'
          max='0.5'
          step='0.01'
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.uStep}
        />
        <label htmlFor='uStep'>U</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='vStep'
          min='0.02'
          max='0.5'
          step='0.01'
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.vStep}
        />
        <label htmlFor='vStep'>V</label>
      </div>
    </div>
  );
}
