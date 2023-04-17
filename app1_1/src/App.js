import React, { useRef } from 'react';
import './App.css';
import ConfPanel from './components/ConfPanel';
import RenderSection from './components/RenderSection';
import { usePref } from './usePref';

export default function App() {
  const { pref, addValue } = usePref();
  const canvasRef = useRef(null);

  return (
    <div className="container">
      <RenderSection pref={pref} canvasRef={canvasRef} addValue={addValue} />
      <ConfPanel pref={pref} canvasRef={canvasRef} addValue={addValue} />
    </div>
  );
}
