import React from 'react';

export default function RotationSection({ handleChange, pref }) {
  return (
    <div className='config-field rotation'>
      <h2>Rotation</h2>
      <div>
        <input
          type='range'
          className='range-input'
          id='r-x'
          min='0'
          max='180'
          onChange={handleChange}
          defaultValue={pref.r.x}
        />
        <label htmlFor='ls-x'>X</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='r-y'
          min='0'
          max='180'
          onChange={handleChange}
          defaultValue={pref.r.y}
        />
        <label htmlFor='ls-y'>Y</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='r-z'
          min='0'
          max='180'
          onChange={handleChange}
          defaultValue={pref.r.z}
        />
        <label htmlFor='ls-z'>Z</label>
      </div>
    </div>
  );
}
