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
    [0, Math.cos(degToRad(pref.r.x)), -Math.sin(degToRad(pref.r.x)), 0],
    [0, Math.sin(degToRad(pref.r.x)), Math.cos(degToRad(pref.r.x)), 0],
    [0, 0, 0, 1],
  ];

  const rotateY = [
    [Math.cos(degToRad(pref.r.y)), 0, Math.sin(degToRad(pref.r.y)), 0],
    [0, 1, 0, 0],
    [-Math.sin(degToRad(pref.r.y)), 0, Math.cos(degToRad(pref.r.y)), 0],
    [0, 0, 0, 1],
  ];

  const rotateZ = [
    [Math.cos(degToRad(pref.r.z)), -Math.sin(degToRad(pref.r.z)), 0, 0],
    [Math.sin(degToRad(pref.r.z)), Math.cos(degToRad(pref.r.z)), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const cube = {
    points: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: pref.l.b, z: 0 },
      { x: pref.l.a, y: pref.l.b, z: 0 },
      { x: pref.l.a, y: 0, z: 0 },
      { x: 0, y: 0, z: pref.l.c },
      { x: 0, y: pref.l.b, z: pref.l.c },
      { x: pref.l.a, y: pref.l.b, z: pref.l.c },
      { x: pref.l.a, y: 0, z: pref.l.c },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ],
  };

  const matrix = pref.projection.yz
    ? matrixX
    : pref.projection.xz
    ? matrixY
    : matrixZ;

  // Landslide
  cube.points = cube.points.map(p => ({
    x: p.x + 10,
    y: p.y + 10,
    z: p.z + 10,
  }));

  // Projection
  const getMultipliedPoint = (m, point) => {
    const res = multiplyMatrices(m, [[point.x], [point.y], [point.z], [1]]).map(
      arr => arr[0]
    );
    return { x: res[0], y: res[1], z: res[2] };
  };

  cube.points = cube.points
    .map(p => getMultipliedPoint(rotateX, p))
    .map(p => getMultipliedPoint(rotateY, p))
    .map(p => getMultipliedPoint(rotateZ, p))
    .map(p => getMultipliedPoint(matrix, p));

  contour.addFigures(cube);
};

const renderContour = function (ctx, pref) {
  ctx.beginPath();

  contour.figure.forEach(fig =>
    fig.lines.forEach(l => {
      drawLine(ctx, pref, fig.points[l[0]], fig.points[l[1]]);
    })
  );

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#919191';
  ctx.stroke();

  ctx.closePath();
};

export const renderContourEvent = (e, canvas, pref, addValue) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearFigures();

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

  pref.calcCellToMM();

  // renderGridWithAxis(ctx, pref);

  // createContour(pref);

  // renderContour(ctx, pref);

  const { x, y, z } = pref.r;
  const xStep = x / pref.r.steps;
  const yStep = y / pref.r.steps;
  const zStep = z / pref.r.steps;
  pref.r.x = 0;
  pref.r.y = 0;
  pref.r.z = 0;

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

    createContour(pref);

    renderContour(ctx, pref);

    pref.r.x += xStep;
    pref.r.y += yStep;
    pref.r.z += zStep;

    if (Math.round(pref.r.x) === x) {
      clearInterval(animation);
      pref.r.x = x;
      pref.r.y = y;
      pref.r.z = z;
    }
  }, 100);
};
