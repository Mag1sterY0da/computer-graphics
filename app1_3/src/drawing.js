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
  ctx.moveTo(pStart.x * pref.cellToMm, pStart.y * pref.cellToMm);
  ctx.lineTo(pEnd.x * pref.cellToMm, pEnd.y * pref.cellToMm);
};

const drawDot = (ctx, pref, point, color) => {
  ctx.beginPath();
  ctx.arc(point.x * pref.cellToMm, point.y * pref.cellToMm, 3, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const degToRad = deg => deg * (Math.PI / 180);

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

const renderGridWithAxis = (ctx, pref) => {
  drawGrid(ctx, pref);

  let xArrow = { x: pref.width, y: 0 };
  let yArrow = { x: 0, y: pref.height };

  // X Axis
  drawArrow(ctx, 0, 0, xArrow.x, xArrow.y, '#fa0000');
  // Y Axis
  drawArrow(ctx, 0, 0, yArrow.x, yArrow.y, '#63ff17');
};

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

const createContour = pref => {
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

  contour.addFigures(
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

  // Landslide
  if (pref.ls.x !== 0 || pref.ls.y !== 0) {
    contour.figures = contour.figures.map(fig =>
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
  if (pref.rot.angle !== 0) {
    contour.figures = contour.figures.map(fig =>
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

  // Segment points, Reference points, Skeleton lines
  contour.figures = contour.figures.map(fig =>
    fig.map(l => {
      const [p0, p1, p2] = l;
      const newLine = [];

      contour.addSegmentPoint(p0);
      contour.addReferencePoint(p1);
      contour.addSkeletonLine(p0, p1);
      contour.addSkeletonLine(p1, p2);

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
};

const getLandslide = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [1, 0, 0],
      [0, 1, 0],
      [pref.ls.x, pref.ls.y, 1],
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
        Math.cos(degToRad(pref.rot.angle)),
        Math.sin(degToRad(pref.rot.angle)),
        0,
      ],
      [
        -Math.sin(degToRad(pref.rot.angle)),
        Math.cos(degToRad(pref.rot.angle)),
        0,
      ],
      [
        -pref.rot.x * (Math.cos(degToRad(pref.rot.angle)) - 1) +
          pref.rot.y * Math.sin(degToRad(pref.rot.angle)),
        -pref.rot.x * Math.sin(degToRad(pref.rot.angle)) -
          pref.rot.y * (Math.cos(degToRad(pref.rot.angle)) - 1),
        1,
      ],
    ]
  );
  point.x = res[0];
  point.y = res[1];

  return point;
};

const createAnimationContour = pref => {
  const newContour = {
    figures: [],
    segmentPoints: [],
    referencePoints: [],
    skeletonLines: [],
    addFigures(...figs) {
      this.figures.push(...figs);
    },
    addSegmentPoint(p) {
      this.segmentPoints.push(p);
    },
    addReferencePoint(p) {
      this.referencePoints.push(p);
    },
    addSkeletonLine(pStart, pEnd) {
      this.skeletonLines.push({
        pStart: { x: pStart.x, y: pStart.y },
        pEnd: { x: pEnd.x, y: pEnd.y },
      });
    },
  };

  const createLine = (xStart, xEnd, yStart, yEnd, n) => {
    const xStep = (xEnd - xStart) / (2 * n);
    const yStep = (yEnd - yStart) / (2 * n);
    let xCur = xStart;
    let yCur = yStart;

    const arr = [];

    for (let i = 0; i < n; i++) {
      arr[i] = [];
      for (let j = 0; j < 3; j++) {
        arr[i].push({ x: xCur, y: yCur });
        if (j !== 2) {
          xCur += xStep;
          yCur += yStep;
        }
      }
    }

    return arr;
  };

  const cloud1 = createLine(2, 8, 20, 20, 6);
  const cloud2 = createLine(8, 11, 20, 20, 3);
  const cloud3 = createLine(11, 11, 20, 13, 7);
  const cloud4 = createLine(11, 11, 13, 7, 6);
  const threshold = createLine(11, 2, 7, 7, 9);
  const arrow = createLine(2, 2, 7, 20, 6);

  const getSquareFig = (x, y) => [
    [
      { x: 11.4 + x, y: 0.7 + y },
      { x: 11.4 + x, y: 2 + y },
      { x: 11.4 + x, y: 2.7 + y },
    ],
    [
      { x: 11.4 + x, y: 2.7 + y },
      { x: 12.4 + x, y: 2.7 + y },
      { x: 13.6 + x, y: 2.7 + y },
    ],
    [
      { x: 13.6 + x, y: 2.7 + y },
      { x: 13.6 + x, y: 2.4 + y },
      { x: 13.6 + x, y: 0.7 + y },
    ],
    [
      { x: 13.6 + x, y: 0.7 + y },
      { x: 12.5 + x, y: 0.7 + y },
      { x: 11.4 + x, y: 0.7 + y },
    ],
  ];

  newContour.addFigures(
    cloud1,
    cloud2,
    cloud3,
    cloud4,
    threshold,
    arrow,
    getSquareFig(0, 0),
    getSquareFig(-0.97, 2.413),
    getSquareFig(2.005, 3.713),
    getSquareFig(1.5, 6.3),
    getSquareFig(0.32, 7.678),
    getSquareFig(-7.65, 3.43),
    getSquareFig(-8.67, 5.84)
  );

  newContour.figures = newContour.figures.map(fig =>
    fig.map(l => {
      const [p0, p1, p2] = l;
      const newLine = [];

      newContour.addSegmentPoint(p0);
      newContour.addReferencePoint(p1);
      newContour.addSkeletonLine(p0, p1);
      newContour.addSkeletonLine(p1, p2);

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

  return newContour;
};

const renderContour = function (ctx, pref) {
  ctx.beginPath();
  let curPoint;
  contour.figures.forEach(fig =>
    fig.forEach(l =>
      l.forEach((p, i) => {
        if (i === 0) {
          curPoint = p;
          return;
        }
        drawLine(ctx, pref, curPoint, p);
        curPoint = p;
      })
    )
  );

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  if (pref.an.showSkeleton) {
    contour.segmentPoints.forEach(p => drawDot(ctx, pref, p, '#0a71d7'));
    contour.referencePoints.forEach(p => drawDot(ctx, pref, p, '#fc1111'));
    contour.skeletonLines.forEach(l => drawLine(ctx, pref, l.pStart, l.pEnd));
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#919191';
    ctx.stroke();
  }

  ctx.closePath();
};

export const renderContourEvent = (e, canvas, pref) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearFigures();
  contour.clearSegmentPoints();
  contour.clearReferencePoints();
  contour.clearSkeletonLines();
  clearAndRender(ctx, canvas, pref);
};

export const animatedContourEvent = (e, canvas, pref) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearFigures();
  contour.clearSegmentPoints();
  contour.clearReferencePoints();
  contour.clearSkeletonLines();

  const endContour = createAnimationContour(pref);

  createContour(pref);
  contour.clearSegmentPoints();
  contour.clearReferencePoints();
  contour.clearSkeletonLines();

  contour.figures.forEach((fig, fi) =>
    fig.forEach((l, li) => {
      l.forEach((p, pi) => {
        setTimeout(() => {
          contour.figures[fi][li][pi] = endContour.figures[fi][li][pi];

          clearAndRender(ctx, canvas, pref, true);
        }, pref.an.duration);
      });
    })
  );
};

const clearAndRender = (ctx, canvas, pref, anim) => {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();

  pref.calcCellToMM();

  renderGridWithAxis(ctx, pref);

  // Creating Curve points
  if (!anim) createContour(pref);

  renderContour(ctx, pref);
};
