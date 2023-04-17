import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { init } from '../drawing';

export default function RenderSection({ pref, canvasRef, addValue }) {
  RenderSection.propTypes = {
    pref: PropTypes.object,
    canvasRef: PropTypes.any,
    addValue: PropTypes.func,
  };

  const renderSectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.height = renderSectionRef.current.offsetHeight;
    canvas.width = renderSectionRef.current.offsetWidth;
    const height = canvas.height - (canvas.height % pref.cellSize);
    const width = canvas.width - (canvas.width % pref.cellSize);

    addValue({ height: height, width: width });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pref.width || !pref.height) return;

    const canvas = canvasRef.current;
    init(canvas, renderSectionRef, pref);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pref.width, pref.height]);

  return (
    <section className="render-section" ref={renderSectionRef}>
      <canvas className="canvas" ref={canvasRef}></canvas>
    </section>
  );
}
