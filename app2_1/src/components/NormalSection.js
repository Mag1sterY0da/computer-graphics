import React from 'react';

export default function NormalSection({ handleChange, pref }) {
  return (
    <div className='config-field normal'>
      <h2>Normal</h2>
      <div>
        <input
          type='range'
          className='range-input'
          id='n-u'
          min='0'
          max='1'
          step='0.01'
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.n.u}
        />
        <label htmlFor='n-u'>U</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='n-v'
          min='0'
          max='1'
          step='0.01'
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.n.v}
        />
        <label htmlFor='n-v'>V</label>
      </div>
      <div>
        <input
          type='range'
          className='range-input'
          id='n-s'
          min='0'
          max='5'
          step='1'
          onChange={handleChange}
          onClick={handleChange}
          defaultValue={pref.n.s}
        />
        <label htmlFor='n-s'>S</label>
      </div>
    </div>
  );
}
