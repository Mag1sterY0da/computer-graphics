import React from 'react';
import Btn from './Btn';
import PropTypes from 'prop-types';
import { renderContourEvent } from '../drawing';

export default function ConfPanel({ pref, canvasRef, addValue }) {
  ConfPanel.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func,
  };

  const renderEvent = e =>
    renderContourEvent(e, canvasRef.current, pref, addValue);

  return (
    <section className="conf-panel-section">
      <form action="ConfPanel#">
        <Btn className="render" value="Render" onClick={renderEvent} />
      </form>
    </section>
  );
}
