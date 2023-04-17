import React from 'react';

export default function LandslideSection({ handleChange, pref }) {
  return (
    <div className='config-field landslide'>
      <h2>Landslide</h2>
      <div>
        <input
          type='range'
          className='range-input'
          id='ls-x'
          min='0'
          max='10'
          onChange={handleChange}
          defaultValue={pref.ls.x}
        />
        <label htmlFor='ls-x'>X</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='ls-y'
          min='0'
          max='10'
          onChange={handleChange}
          defaultValue={pref.ls.y}
        />
        <label htmlFor='ls-y'>Y</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='ls-z'
          min='0'
          max='10'
          onChange={handleChange}
          defaultValue={pref.ls.z}
        />
        <label htmlFor='ls-z'>Z</label>
      </div>
    </div>
  );
}
