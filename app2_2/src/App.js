import React, { useRef } from 'react';
import './App.css';
import RenderSection from './components/RenderSection';
import ConfigSection from './components/ConfigSection';

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
    l: {
      x: 10,
      y: 6,
      z: 2,
    },
  });

  return (
    <main>
      <ConfigSection rendererRef={rendererRef} pref={pref}></ConfigSection>
      <RenderSection rendererRef={rendererRef} pref={pref}></RenderSection>
    </main>
  );
}
