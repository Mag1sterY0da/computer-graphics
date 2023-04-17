import React from 'react';
import PropTypes from 'prop-types';

export default function Btn({ className, value, onClick }) {
  Btn.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
  };

  const myClass = `btn btn--${className}`;

  return (
    <button className={myClass} onClick={onClick}>
      {value}
    </button>
  );
}
