import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { init } from '../drawing';

export default function RenderSection({ pref, canvasRef, addValue }) {
  RenderSection.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func
  };

  const renderSectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.height = renderSectionRef.current.offsetHeight;
    canvas.width = renderSectionRef.current.offsetWidth;
    const height = canvas.height - (canvas.height % pref.cellSize);
    const width = canvas.width - (canvas.width % pref.cellSize);

    addValue({ height: height, width: width });
  }, []);

  useEffect(() => {
    if (!pref.width || !pref.height) return;

    const canvas = canvasRef.current;
    init(canvas, renderSectionRef, pref);
  }, [pref.height, pref.width]);

  return (
    <section className="render-section" ref={renderSectionRef}>
      <canvas className="canvas" ref={canvasRef}></canvas>
    </section>
  );
}
