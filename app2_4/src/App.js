import React, { useRef } from 'react';
import './App.css';
import ConfigSection from './components/ConfigSection';
import RenderSection from './components/RenderSection';

export default function App() {
  const rendererRef = useRef(null);
  const [pref] = React.useState({
    camera: {
      x: 15,
      y: 20,
      z: 35,
    },
    ls: {
      x: 0,
      y: 0,
      z: 0,
    },
    r: {
      x: 0,
      y: 0,
      z: 0,
    },
    uStep: 0.02,
    vStep: 0.2,
    vCount: 30,
  });

  return (
    <main>

      <ConfigSection rendererRef={rendererRef} pref={pref}></ConfigSection>
      <RenderSection rendererRef={rendererRef} pref={pref}></RenderSection>
    </main>
  );
}
