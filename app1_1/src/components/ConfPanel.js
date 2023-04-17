import React from 'react';
import ScaleSection from './ScaleSection';
import LengthSection from './LengthSection';
import RadiusSection from './RadiusSection';
import LandslideSection from './LandslideSection';
import RotationSection from './RotationSection';
import AffineSection from './AffineSection';
import ProjectiveSection from './ProjectiveSection';
import Btn from './Btn';
import PropTypes from 'prop-types';

export default function ConfPanel({ pref, canvasRef, addValue }) {
  ConfPanel.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func
  };

  return (
    <section className="conf-panel-section">
      <form action="ConfPanel#">
        <ScaleSection pref={pref} addValue={addValue} />
        <LengthSection pref={pref} addValue={addValue} />
        <RadiusSection pref={pref} addValue={addValue} />
        <LandslideSection pref={pref} addValue={addValue} />
        <RotationSection pref={pref} addValue={addValue} />
        <AffineSection pref={pref} addValue={addValue} />
        <ProjectiveSection pref={pref} addValue={addValue} />
        <Btn
          className="render"
          value="Render"
          pref={pref}
          canvasRef={canvasRef}
        />
      </form>
    </section>
  );
}
