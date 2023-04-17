import React from 'react';
import { renderEvent } from '../drawing';
import CameraSection from './CameraSection';
import LandslideSection from './LandslideSection';
import RotationSection from './RotationSection';

export default function ConfigSection({ rendererRef, pref }) {
  const handleChange = e => {
    const { id, value } = e.target;
    const type = id.split('-')[0];
    const axis = id.split('-')[1];
    if (!axis) {
      pref[type] = +value;
    } else pref[type][axis] = +value;

    renderEvent(rendererRef.current, pref);
  };

  return (
    <div className="config-section">
      <CameraSection handleChange={handleChange} pref={pref}></CameraSection>
      <LandslideSection
        handleChange={handleChange}
        pref={pref}
      ></LandslideSection>
      <RotationSection
        handleChange={handleChange}
        pref={pref}
      ></RotationSection>
    </div>
  );
}
