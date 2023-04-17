import React from 'react';
import ScaleSection from './ScaleSection';
import LandslideSection from './LandslideSection';
import RotationSection from './RotationSection';
import Btn from './Btn';
import PropTypes from 'prop-types';
import { animatedCurveEvent, renderCurveEvent } from '../drawing';
import AnimationSection from './AnimationSection';
import TNASection from './TNASection';
import InfoSection from './InfoSection';
import ALengthSection from './ALengthSection';

export default function ConfPanel({ pref, canvasRef, addValue }) {
  ConfPanel.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func,
  };

  const renderEvent = e =>
    renderCurveEvent(e, canvasRef.current, pref, addValue);

  const animatedRenderEvent = e =>
    animatedCurveEvent(e, canvasRef.current, pref, addValue);

  return (
    <section className="conf-panel-section">
      <form action="ConfPanel#">
        <ScaleSection pref={pref} addValue={addValue} />
        <ALengthSection pref={pref} addValue={addValue} />
        <LandslideSection pref={pref} addValue={addValue} />
        <RotationSection pref={pref} addValue={addValue} />
        <AnimationSection
          pref={pref}
          addValue={addValue}
          onClick={animatedRenderEvent}
        />
        <TNASection pref={pref} addValue={addValue} />
        <InfoSection pref={pref} addValue={addValue} />
        <Btn className="render" value="Render" onClick={renderEvent} />
      </form>
    </section>
  );
}
