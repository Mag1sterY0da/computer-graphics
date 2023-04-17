import { contour } from './config/contour';

export const init = (canvas, renderSectionRef, pref) => {
  const ctx = canvas.getContext('2d');
  // Transform Y Axis
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  pref.calcCellToMM();

  renderGridWithAxis(ctx, pref);
};

const drawGrid = (ctx, pref) => {
  ctx.beginPath();

  // X Grid
  for (let i = 0; i <= pref.height; i += pref.cellSize) {
    let lineX = { x: pref.width, y: i };
    let lineY = { x: 0, y: i };
    ctx.moveTo(lineX.x, lineX.y);
    ctx.lineTo(lineY.x, lineY.y);
  }

  // Y Grid
  for (let i = 0; i <= pref.width; i += pref.cellSize) {
    let lineX = { x: i, y: 0 };
    let lineY = { x: i, y: pref.height };
    ctx.moveTo(lineX.x, lineX.y);
    ctx.lineTo(lineY.x, lineY.y);
  }

  ctx.strokeStyle = '#B2B2B2';
  ctx.stroke();
  ctx.closePath();
};

const drawArrow = (ctx, xStart, yStart, xEnd, yEnd, color) => {
  ctx.beginPath();
  const headLen = 10; // length of head in pixels
  const dx = xEnd - xStart;
  const dy = yEnd - yStart;
  const angle = Math.atan2(dy, dx);
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.lineTo(
    xEnd - headLen * Math.cos(angle - Math.PI / 6),
    yEnd - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(xEnd, yEnd);
  ctx.lineTo(
    xEnd - headLen * Math.cos(angle + Math.PI / 6),
    yEnd - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};

const drawLine = (ctx, pref, pStart, pEnd) => {
  if (pref.projection.xy) {
    ctx.moveTo(pStart.x * pref.cellToMm, pStart.y * pref.cellToMm);
    ctx.lineTo(pEnd.x * pref.cellToMm, pEnd.y * pref.cellToMm);
  } else if (pref.projection.xz) {
    ctx.moveTo(pStart.x * pref.cellToMm, pStart.z * pref.cellToMm);
    ctx.lineTo(pEnd.x * pref.cellToMm, pEnd.z * pref.cellToMm);
  } else {
    ctx.moveTo(pStart.y * pref.cellToMm, pStart.z * pref.cellToMm);
    ctx.lineTo(pEnd.y * pref.cellToMm, pEnd.z * pref.cellToMm);
  }
};

const renderGridWithAxis = (ctx, pref) => {
  drawGrid(ctx, pref);

  let xArrow = { x: pref.width, y: 0 };
  let yArrow = { x: 0, y: pref.height };

  // X Axis
  drawArrow(ctx, 0, 0, xArrow.x, xArrow.y, '#fa0000');
  // Y Axis
  drawArrow(ctx, 0, 0, yArrow.x, yArrow.y, '#63ff17');
};

const multiplyMatrices = (m1, m2) => {
  const result = [];
  for (let i = 0; i < m1.length; i++) {
    result[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

const degToRad = deg => deg * (Math.PI / 180);

const getBezierPoint = (t, p0, p1, p2) => {
  return {
    x:
      Math.pow(1 - t, 2) * p0.x +
      2 * (1 - t) * t * p1.x +
      Math.pow(t, 2) * p2.x,
    y:
      Math.pow(1 - t, 2) * p0.y +
      2 * (1 - t) * t * p1.y +
      Math.pow(t, 2) * p2.y,
  };
};

const getLandslide = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [1, 0, 0],
      [0, 1, 0],
      [pref.lsPicture.x, pref.lsPicture.y, 1],
    ]
  );
  point.x = res[0];
  point.y = res[1];

  return point;
};

const getRotation = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [
        Math.cos(degToRad(pref.rPicture.angle)),
        Math.sin(degToRad(pref.rPicture.angle)),
        0,
      ],
      [
        -Math.sin(degToRad(pref.rPicture.angle)),
        Math.cos(degToRad(pref.rPicture.angle)),
        0,
      ],
      [
        -pref.rPicture.x * (Math.cos(degToRad(pref.rPicture.angle)) - 1) +
          pref.rPicture.y * Math.sin(degToRad(pref.rPicture.angle)),
        -pref.rPicture.x * Math.sin(degToRad(pref.rPicture.angle)) -
          pref.rPicture.y * (Math.cos(degToRad(pref.rPicture.angle)) - 1),
        1,
      ],
    ]
  );
  point.x = res[0];
  point.y = res[1];

  return point;
};

export const createContour = pref => {
  const matrixX = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const matrixY = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const matrixZ = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ];

  const rotateX = [
    [1, 0, 0, 0],
    [
      0,
      Math.cos(degToRad(pref.rContour.x)),
      -Math.sin(degToRad(pref.rContour.x)),
      0,
    ],
    [
      0,
      Math.sin(degToRad(pref.rContour.x)),
      Math.cos(degToRad(pref.rContour.x)),
      0,
    ],
    [0, 0, 0, 1],
  ];

  const rotateY = [
    [
      Math.cos(degToRad(pref.rContour.y)),
      0,
      Math.sin(degToRad(pref.rContour.y)),
      0,
    ],
    [0, 1, 0, 0],
    [
      -Math.sin(degToRad(pref.rContour.y)),
      0,
      Math.cos(degToRad(pref.rContour.y)),
      0,
    ],
    [0, 0, 0, 1],
  ];

  const rotateZ = [
    [
      Math.cos(degToRad(pref.rContour.z)),
      -Math.sin(degToRad(pref.rContour.z)),
      0,
      0,
    ],
    [
      Math.sin(degToRad(pref.rContour.z)),
      Math.cos(degToRad(pref.rContour.z)),
      0,
      0,
    ],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const cloud1 = [
    [
      { x: 11.44, y: 15.44 },
      { x: 10.8, y: 19.5 },
      { x: 8.2, y: 19.18 },
    ],
    [
      { x: 8.2, y: 19.18 },
      { x: 5.7, y: 18.86 },
      { x: 6.2, y: 15.92 },
    ],
    [
      { x: 6.2, y: 15.92 },
      { x: 6.56, y: 14.12 },
      { x: 8.6, y: 14 },
    ],
    [
      { x: 8.6, y: 14 },
      { x: 4.95, y: 13.5 },
      { x: 5.4, y: 17.2 },
    ],
    [
      { x: 5.4, y: 17.2 },
      { x: 6, y: 20.6 },
      { x: 10, y: 19.6 },
    ],
    [
      { x: 10, y: 19.6 },
      { x: 12.4, y: 18 },
      { x: 11.44, y: 15.44 },
    ],
  ];

  const cloud2 = [
    [
      { x: 11.65, y: 17.63 },
      { x: 15.72, y: 18.91 },
      { x: 16.18, y: 16.25 },
    ],
    [
      { x: 16.18, y: 16.25 },
      { x: 15.86, y: 16.18 },
      { x: 15.53, y: 16.11 },
    ],
    [
      { x: 15.53, y: 16.11 },
      { x: 15.19, y: 18.42 },
      { x: 11.65, y: 17.63 },
    ],
  ];

  const cloud3 = [
    [
      { x: 15.47, y: 13.34 },
      { x: 11.58, y: 12.37 },
      { x: 14.4, y: 14.8 },
    ],
    [
      { x: 14.4, y: 14.8 },
      { x: 17.78, y: 16.73 },
      { x: 17.8, y: 14.1 },
    ],
    [
      { x: 17.8, y: 14.1 },
      { x: 16.92, y: 10.24 },
      { x: 10.28, y: 10.68 },
    ],
    [
      { x: 10.28, y: 10.68 },
      { x: 15.79, y: 9.02 },
      { x: 18.9, y: 13.78 },
    ],
    [
      { x: 18.9, y: 13.78 },
      { x: 19.5, y: 16.5 },
      { x: 16.77, y: 16.14 },
    ],
    [
      { x: 16.77, y: 16.14 },
      { x: 13.77, y: 15.8 },
      { x: 12.6, y: 13.35 },
    ],
    [
      { x: 12.6, y: 13.35 },
      { x: 12.4, y: 11.95 },
      { x: 15.47, y: 13.34 },
    ],
  ];

  const cloud4 = [
    [
      { x: 4.47, y: 13.85 },
      { x: -0.22, y: 13.7 },
      { x: 2.05, y: 11.25 },
    ],
    [
      { x: 2.05, y: 11.25 },
      { x: 5.42, y: 8.51 },
      { x: 11.26, y: 12.03 },
    ],
    [
      { x: 11.26, y: 12.03 },
      { x: 11.46, y: 11.93 },
      { x: 11.65, y: 11.837 },
    ],
    [
      { x: 11.65, y: 11.837 },
      { x: 6.03, y: 7.97 },
      { x: 1.94, y: 10.42 },
    ],
    [
      { x: 1.94, y: 10.42 },
      { x: -1.41, y: 12.77 },
      { x: 1.9, y: 14 },
    ],
    [
      { x: 1.9, y: 14 },
      { x: 3.33, y: 14.37 },
      { x: 4.47, y: 13.85 },
    ],
  ];

  const threshold = [
    [
      { x: 10.4, y: 10.06 },
      { x: 10.46, y: 10.09 },
      { x: 11.29, y: 9.9 },
    ],
    [
      { x: 11.29, y: 9.9 },
      { x: 9.63, y: 7.98 },
      { x: 7.53, y: 5.64 },
    ],
    [
      { x: 7.53, y: 5.64 },
      { x: 8.77, y: 6.21 },
      { x: 10.01, y: 6.82 },
    ],
    [
      { x: 10.01, y: 6.82 },
      { x: 11.3, y: 7.25 },
      { x: 10.62, y: 6.1 },
    ],
    [
      { x: 10.62, y: 6.1 },
      { x: 8.9, y: 4.4 },
      { x: 7.4, y: 2.93 },
    ],
    [
      { x: 6.88, y: 2.97 },
      { x: 9.14, y: 5.13 },
      { x: 10.045, y: 6.285 },
    ],
    [
      { x: 10.045, y: 6.285 },
      { x: 8.175, y: 5.1 },
      { x: 7.484, y: 5.14 },
    ],
    [
      { x: 7.484, y: 5.14 },
      { x: 6.07, y: 4.96 },
      { x: 7, y: 6.3 },
    ],
    [
      { x: 7, y: 6.3 },
      { x: 9.15, y: 8.68 },
      { x: 10.4, y: 10.06 },
    ],
  ];

  const arrow = [
    [
      { x: 6.88, y: 2.67 },
      { x: 7.57, y: 2.99 },
      { x: 8.18, y: 3.27 },
    ],
    [
      { x: 8.18, y: 3.27 },
      { x: 9.695, y: 3.7 },
      { x: 8.3, y: 2.72 },
    ],
    [
      { x: 8.3, y: 2.72 },
      { x: 6.66, y: 1.9 },
      { x: 5.25, y: 1.16 },
    ],
    [
      { x: 5.25, y: 1.16 },
      { x: 6.25, y: 2.89 },
      { x: 6.54, y: 4.2 },
    ],
    [
      { x: 6.54, y: 4.2 },
      { x: 6.933, y: 4.39 },
      { x: 6.99, y: 4.226 },
    ],
    [
      { x: 6.99, y: 4.226 },
      { x: 6.947, y: 3.61 },
      { x: 6.88, y: 2.67 },
    ],
  ];

  const getDrop = (x, y) => [
    [
      { x: 11.47 + x, y: 0.707 + y },
      { x: 12.34 + x, y: 1.934 + y },
      { x: 13.014 + x, y: 2.74 + y },
    ],
    [
      { x: 13.014 + x, y: 2.74 + y },
      { x: 13.59 + x, y: 2.807 + y },
      { x: 13.56 + x, y: 2.567 + y },
    ],
    [
      { x: 13.56 + x, y: 2.567 + y },
      { x: 13.48 + x, y: 2.35 + y },
      { x: 11.788 + x, y: 0.63 + y },
    ],
    [
      { x: 11.788 + x, y: 0.63 + y },
      { x: 11.602 + x, y: 0.623 + y },
      { x: 11.47 + x, y: 0.707 + y },
    ],
  ];

  contour.addPictureFigures(
    cloud1,
    cloud2,
    cloud3,
    cloud4,
    threshold,
    arrow,
    getDrop(0, 0),
    getDrop(-0.97, 2.413),
    getDrop(2.005, 3.713),
    getDrop(1.5, 6.3),
    getDrop(0.32, 7.678),
    getDrop(-7.65, 3.43),
    getDrop(-8.67, 5.84)
  );

  const getXYZ = (v, u) => {
    const x =
      pref.l.r *
      Math.cos(degToRad(u)) *
      Math.cos(degToRad(v)) *
      (1 + 0.5 * Math.abs(Math.sin(degToRad(2 * u))));
    const y =
      pref.l.r *
      Math.sin(degToRad(u)) *
      Math.cos(degToRad(v)) *
      (1 + 0.5 * Math.abs(Math.sin(degToRad(2 * u))));
    const z =
      v <= 0
        ? pref.l.r * Math.sin(degToRad(v))
        : pref.l.r * Math.sin(degToRad(v)) + pref.l.r * Math.pow(v / 90, 5);
    return { x, y, z };
  };

  const getGarlic = pref => {
    const garlic = {
      contourPoints: [],
      picturePoints: [],
      pictureFigure: [],
    };
    for (let u = 0; u <= 360; u += pref.uStep) {
      for (let v = -90; v <= 90; v += pref.vStep) {
        const { x, y, z } = getXYZ(v, u);
        garlic.contourPoints.push({ x, y, z, v, u });
      }
    }

    for (let v = -90; v <= 90; v += pref.vStep) {
      for (let u = 0; u <= 360; u += pref.uStep) {
        const { x, y, z } = getXYZ(v, u);
        garlic.contourPoints.push({ x, y, z, v, u });
      }
    }

    // Landslide
    if (pref.lsPicture.x !== 0 || pref.lsPicture.y !== 0) {
      garlic.pictureFigure = contour.pictureFigure.map(fig =>
        fig.map(l => {
          const [p0, p1, p2] = l;
          return [
            getLandslide(p0, pref),
            getLandslide(p1, pref),
            getLandslide(p2, pref),
          ];
        })
      );
    }

    // Rotations
    if (pref.rPicture.angle !== 0) {
      garlic.pictureFigure = garlic.pictureFigure.map(fig =>
        fig.map(l => {
          const [p0, p1, p2] = l;
          return [
            getRotation(p0, pref),
            getRotation(p1, pref),
            getRotation(p2, pref),
          ];
        })
      );
    }

    garlic.pictureFigure = garlic.pictureFigure.map(fig =>
      fig.map(l => {
        const [p0, p1, p2] = l;
        const newLine = [];

        for (
          let t = pref.tStart;
          Math.round(t * 10) / 10 <= pref.tEnd;
          t += pref.tStep
        ) {
          const point = getBezierPoint(t, p0, p1, p2);
          newLine.push({ x: point.x, y: point.y });
        }

        return newLine;
      })
    );

    garlic.pictureFigure.forEach((fig, i) => {
      fig.forEach(l => {
        l.forEach(p => {
          const u = p.x * Math.PI;
          const v = p.y * Math.PI;
          const { x, y, z } = getXYZ(v, u);
          garlic.picturePoints.push({ x, y, z, v, u, i });
        });
      });
    });

    return garlic;
  };

  const getMultipliedPoint = (m, p) => {
    const res = multiplyMatrices(m, [[p.x], [p.y], [p.z], [1]]).map(
      arr => arr[0]
    );
    return { x: res[0], y: res[1], z: res[2], v: p.v, u: p.u, i: p?.i };
  };

  const matrix = pref.projection.yz
    ? matrixX
    : pref.projection.xz
    ? matrixY
    : matrixZ;

  // Landslide -> Rotation -> Projection
  const garlic = getGarlic(pref);

  garlic.contourPoints = garlic.contourPoints
    .map(p => ({
      x: p.x + pref.lsContour.x,
      y: p.y + pref.lsContour.y,
      z: p.z + pref.lsContour.z,
      v: p.v,
      u: p.u,
    }))
    .map(p => getMultipliedPoint(rotateX, p))
    .map(p => getMultipliedPoint(rotateY, p))
    .map(p => getMultipliedPoint(rotateZ, p))
    .map(p => getMultipliedPoint(matrix, p));

  garlic.picturePoints = garlic.picturePoints
    .map(p => ({
      x: p.x + pref.lsContour.x,
      y: p.y + pref.lsContour.y,
      z: p.z + pref.lsContour.z,
      v: p.v,
      u: p.u,
      i: p.i,
    }))
    .map(p => getMultipliedPoint(rotateX, p))
    .map(p => getMultipliedPoint(rotateY, p))
    .map(p => getMultipliedPoint(rotateZ, p))
    .map(p => getMultipliedPoint(matrix, p));

  contour.addFigures(garlic);
};

const renderContour = function (ctx, pref) {
  ctx.beginPath();

  contour.figure.forEach(fig =>
    fig.contourPoints.forEach((p, pi) => {
      if (p.v === 360) return;
      drawLine(ctx, pref, p, fig.contourPoints[pi + 1] || fig.contourPoints[0]);
    })
  );

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#3d3d3d';
  ctx.stroke();

  let curPoint;
  contour.figure.forEach(fig =>
    fig.picturePoints.forEach((p, i) => {
      if (p.i !== fig.picturePoints[i - 1]?.i || i === 0) {
        curPoint = p;
        return;
      }
      ctx.beginPath();
      drawLine(ctx, pref, curPoint, p);
      curPoint = p;
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#2d5ad2';
      ctx.stroke();
      ctx.closePath();
    })
  );

  ctx.closePath();
};

export const renderContourEvent = (e, canvas, pref, addValue) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearFigures();
  contour.clearPictureFigures();

  clearAndRender(ctx, canvas, pref, addValue);
};

const clearAndRender = (ctx, canvas, pref) => {
  // // Store the current transformation matrix
  // ctx.save();
  //
  // // Use the identity matrix while clearing the canvas
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  // // Restore the transform
  // ctx.restore();
  //
  // pref.calcCellToMM();
  //
  // renderGridWithAxis(ctx, pref);
  //
  // createContour(pref);
  //
  // renderContour(ctx, pref);

  const { x, y, z } = pref.rContour;
  const xStep = x / pref.rContour.steps;
  const yStep = y / pref.rContour.steps;
  const zStep = z / pref.rContour.steps;
  pref.rContour.x = 0;
  pref.rContour.y = 0;
  pref.rContour.z = 0;

  const animation = setInterval(() => {
    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    ctx.restore();

    renderGridWithAxis(ctx, pref);

    contour.clearFigures();
    contour.clearPictureFigures();

    createContour(pref);

    renderContour(ctx, pref);

    pref.rContour.x += xStep;
    pref.rContour.y += yStep;
    pref.rContour.z += zStep;

    if (Math.round(pref.rContour.x) === x) {
      clearInterval(animation);
      pref.rContour.x = x;
      pref.rContour.y = y;
      pref.rContour.z = z;
    }
  }, 100);
};
