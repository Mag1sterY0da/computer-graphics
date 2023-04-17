import React, { useEffect, useRef } from 'react';
import { renderEvent } from '../drawing';
import * as THREE from 'three';

export default function RenderSection({ rendererRef, pref }) {
  const renderRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderRef.current.appendChild(renderer.domElement);

    rendererRef.current = renderer;

    renderEvent(rendererRef.current, pref);
    return () => {
      document.querySelector('canvas')?.remove();
    };
  }, [pref, rendererRef]);

  return <div ref={renderRef}></div>;
}
