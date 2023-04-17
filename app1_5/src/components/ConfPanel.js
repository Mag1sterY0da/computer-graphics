import React from 'react';
import Btn from './Btn';
import PropTypes from 'prop-types';
import { renderContourEvent } from '../drawing';
import ProjectionSection from './ProjectionSection';
import LengthSection from './LengthSection';

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
        <LengthSection pref={pref} addValue={addValue} />
        <ProjectionSection pref={pref} addValue={addValue} />
        <Btn className="render" value="Render" onClick={renderEvent} />
      </form>
    </section>
  );
}
