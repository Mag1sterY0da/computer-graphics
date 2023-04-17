import { curve } from './config/curve';

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

const drawDot = (ctx, pref, point) => {
  ctx.beginPath();
  ctx.arc(point.x * pref.cellToMm, point.y * pref.cellToMm, 3, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a71d7';
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

const getCurvePoint = (a, phi) => {
  return {
    x: (3 * a * Math.tan(phi)) / (1 + Math.pow(Math.tan(phi), 3)),
    y: (3 * a * Math.pow(Math.tan(phi), 2)) / (1 + Math.pow(Math.tan(phi), 3)),
  };
};

const getMinDerX = phi => {
  const tan = Math.tan(phi);
  const cos = Math.cos(phi);
  return (
    (Math.pow(tan, 3) + 1) / Math.pow(cos, 2) -
    (3 * Math.pow(tan, 3)) / Math.pow(cos, 2)
  );
};

const getMinDerY = phi => {
  const tan = Math.tan(phi);
  const cos = Math.cos(phi);
  return (
    (2 * tan * (Math.pow(tan, 3) + 1)) / Math.pow(cos, 2) -
    (3 * Math.pow(tan, 4)) / Math.pow(cos, 2)
  );
};

const getTanPoints = point => {
  const der = getMinDerY(degToRad(point.phi)) / getMinDerX(degToRad(point.phi));
  const x1 = point.x - 20;
  const x2 = point.x + 20;
  const y1 = point.y + der * (x1 - point.x);
  const y2 = point.y + der * (x2 - point.x);
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
};

const getNormalPoint = point => {
  const der = getMinDerY(degToRad(point.phi)) / getMinDerX(degToRad(point.phi));
  const x1 = point.x - 20;
  const x2 = point.x + 20;
  const y1 = point.y - (1 / der) * (x1 - point.x);
  const y2 = point.y - (1 / der) * (x2 - point.x);
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
};

const getAsymptotesPoints = a => {
  const x1 = -100;
  const x2 = 100;
  const y1 = -x1 - a;
  const y2 = -x2 - a;
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
};

const getInflectionPoint = pref => {
  const cord = (3 * pref.a * pref.cellToMm) / 2;
  return { x: cord, y: cord };
};

const getArcLength = a => 4.917488 * a;

const getSquare = a => (3 / 2) * a * a;

const getRadiusOfCurvature = a => (3 * a) / (1 + Math.pow(Math.tan(a), 3));

const createCurve = pref => {
  for (let phi = pref.alpha; phi <= pref.beta; phi += pref.step) {
    const { x, y } = getCurvePoint(pref.a * pref.cellToMm, degToRad(phi));
    curve.addPoint(x, y);
  }

  // Getting curve point for TNA phi
  const { x, y } = getCurvePoint(pref.a * pref.cellToMm, degToRad(pref.phi));
  curve.curvePoint = { x, y, phi: pref.phi };

  // Tangent Line
  if (pref.tna.tang) curve.tanLine = getTanPoints(curve.curvePoint);

  // Normal Line
  if (pref.tna.norm) curve.normLine = getNormalPoint(curve.curvePoint);

  // Asymptote Line
  if (pref.tna.asy) curve.asyLine = getAsymptotesPoints(pref.a * pref.cellToMm);

  if (pref.tna.infl) curve.inflPoint = getInflectionPoint(pref);

  // Landslide
  if (pref.ls.x !== 0 || pref.ls.y !== 0) {
    curve.points.map(point => getLandslide(point, pref));
    if (pref.tna.tang) curve.tanLine.map(point => getLandslide(point, pref));
    if (pref.tna.norm) curve.normLine.map(point => getLandslide(point, pref));
    if (pref.tna.asy) curve.asyLine.map(point => getLandslide(point, pref));
    if (pref.tna.infl) curve.inflPoint = getLandslide(curve.inflPoint, pref);
  }

  // Rotations
  if (pref.rot.angle !== 0) {
    curve.points.map(point => getRotation(point, pref));
    if (pref.tna.tang) curve.tanLine.map(point => getRotation(point, pref));
    if (pref.tna.norm) curve.normLine.map(point => getRotation(point, pref));
    if (pref.tna.asy) curve.asyLine.map(point => getRotation(point, pref));
    if (pref.tna.infl) curve.inflPoint = getRotation(curve.inflPoint, pref);
  }
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

const renderCurve = function (ctx, pref) {
  ctx.beginPath();
  let curPoint;
  curve.points.forEach((p, i) => {
    if (i === 0 || i === Math.round(135 / pref.step)) {
      curPoint = p;
      return;
    }
    drawLine(ctx, pref, curPoint, p);
    curPoint = p;
  });

  if (pref.tna.tang) drawLine(ctx, pref, curve.tanLine[0], curve.tanLine[1]);
  if (pref.tna.norm) drawLine(ctx, pref, curve.normLine[0], curve.normLine[1]);
  if (pref.tna.asy) drawLine(ctx, pref, curve.asyLine[0], curve.asyLine[1]);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Finished drawing of lines
  // And start of drawing dot
  if (pref.tna.infl) drawDot(ctx, pref, curve.inflPoint);
};

export const renderCurveEvent = (e, canvas, pref, addValue) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  curve.clearPoints();

  // Setting arcLength
  addValue({
    arcLength: getArcLength(pref.a),
    square: getSquare(pref.a),
    radiusOfCurvature: getRadiusOfCurvature(pref.a),
  });

  clearAndRender(ctx, canvas, pref);
};

export const animatedCurveEvent = (e, canvas, pref, addValue) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  const prevA = pref.a;
  pref.a = pref.an.start;

  const animation = setInterval(() => {
    curve.clearPoints();
    clearAndRender(ctx, canvas, pref);
    pref.a += pref.an.step;
    if (pref.a >= pref.an.end) {
      clearInterval(animation);

      // Setting arcLength
      addValue({
        a: prevA,
        arcLength: getArcLength(pref.an.end),
        square: getSquare(pref.an.end),
        radius: getRadiusOfCurvature(pref.an.end),
      });
    }
  }, pref.an.duration);
};

const clearAndRender = (ctx, canvas, pref) => {
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
  createCurve(pref);

  renderCurve(ctx, pref);
};
