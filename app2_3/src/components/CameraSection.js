import React from 'react';

export default function CameraSection({ handleChange, pref }) {
  return (
    <div className='config-field camera'>
      <h2>Camera</h2>
      <div>
        <input
          type='range'
          className='range-input'
          id='camera-x'
          min='0'
          max='50'
          onChange={handleChange}
          defaultValue={pref.camera.x}
        />
        <label htmlFor='camera-x'>X</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='camera-y'
          min='0'
          max='50'
          onChange={handleChange}
          defaultValue={pref.camera.y}
        />
        <label htmlFor='camera-y'>Y</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='camera-z'
          min='0'
          max='50'
          onChange={handleChange}
          defaultValue={pref.camera.z}
        />
        <label htmlFor='camera-z'>Z</label>
      </div>
    </div>
  );
}
