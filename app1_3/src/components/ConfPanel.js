import React from 'react';
import ScaleSection from './ScaleSection';
import LandslideSection from './LandslideSection';
import RotationSection from './RotationSection';
import Btn from './Btn';
import PropTypes from 'prop-types';
import { animatedContourEvent, renderContourEvent } from '../drawing';
import AnimationSection from './AnimationSection';

export default function ConfPanel({ pref, canvasRef, addValue }) {
  ConfPanel.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func,
  };

  const renderEvent = e =>
    renderContourEvent(e, canvasRef.current, pref, addValue);

  const animatedRenderEvent = e =>
    animatedContourEvent(e, canvasRef.current, pref, addValue);

  return (
    <section className="conf-panel-section">
      <form action="ConfPanel#">
        <ScaleSection pref={pref} addValue={addValue} />
        <LandslideSection pref={pref} addValue={addValue} />
        <RotationSection pref={pref} addValue={addValue} />
        <AnimationSection
          pref={pref}
          addValue={addValue}
          onClick={animatedRenderEvent}
        />
        <Btn className="render" value="Render" onClick={renderEvent} />
      </form>
    </section>
  );
}
