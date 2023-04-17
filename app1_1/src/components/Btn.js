import React from 'react';
import PropTypes from 'prop-types';
import { renderFigureEvent } from '../drawing';

export default function Btn({ className, value, pref, canvasRef }) {
  Btn.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    pref: PropTypes.object,
    canvasRef: PropTypes.any
  };

  const myClass = `btn btn--${className}`;

  return (
    <button
      className={myClass}
      onClick={(e) => renderFigureEvent(e, canvasRef.current, pref)}>
      {value}
    </button>
  );
}
