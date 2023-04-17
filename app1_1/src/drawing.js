import { figure } from './config/figure';

export const init = (canvas, renderSectionRef, pref) => {
  const ctx = canvas.getContext('2d');
  // Transform Y Axis
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  pref.calcCellToMM();

  renderGridWithAxis(ctx, pref);
};

const drawGrid = (ctx, pref) => {
  let cellSize = pref.cellSize;
  const getAffOrProjCoords = (lineX, lineY) => {
    // Affine
    if (
      pref.aff.xx !== 1 ||
      pref.aff.xy !== 0 ||
      pref.aff.yx !== 0 ||
      pref.aff.yy !== 1
    ) {
      lineX = getAffine(lineX, pref);
      lineY = getAffine(lineY, pref);
    }
    // Projective
    if (
      pref.pro.xx !== 0 ||
      pref.pro.xy !== 0 ||
      pref.pro.wx !== 0 ||
      pref.pro.yx !== 0 ||
      pref.pro.yy !== 0 ||
      pref.pro.wy !== 0
    ) {
      lineX = getProjective(lineX, pref);
      lineX.x *= pref.cellToMm;
      lineX.y *= pref.cellToMm;
      lineY = getProjective(lineY, pref);
      lineY.x *= pref.cellToMm;
      lineY.y *= pref.cellToMm;
    }
  };

  ctx.beginPath();

  if (
    pref.pro.xx !== 0 ||
    pref.pro.xy !== 0 ||
    pref.pro.wx !== 0 ||
    pref.pro.yx !== 0 ||
    pref.pro.yy !== 0 ||
    pref.pro.wy !== 0
  )
    cellSize /= pref.cellToMm;

  // X Grid
  for (let i = 0; i <= pref.height; i += cellSize) {
    let lineX = { x: pref.width, y: i };
    let lineY = { x: 0, y: i };
    getAffOrProjCoords(lineX, lineY);
    ctx.moveTo(lineX.x, lineX.y);
    ctx.lineTo(lineY.x, lineY.y);
  }

  // Y Grid
  for (let i = 0; i <= pref.width; i += cellSize) {
    let lineX = { x: i, y: 0 };
    let lineY = { x: i, y: pref.height };
    getAffOrProjCoords(lineX, lineY);
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

const drawArc = (
  pointCenter,
  r,
  angleStart,
  angleEnd,
  counterClockwise = false,
  ctx,
  pref
) => {
  let pBeg, pEnd;
  let curDeg, nextDeg;
  if (counterClockwise) [angleStart, angleEnd] = [angleEnd, angleStart];
  for (let i = angleStart; i < angleEnd; ++i) {
    curDeg = degToRad(i);
    nextDeg = degToRad(i + 1);

    pBeg = {
      x: r * Math.cos(curDeg) + pointCenter.x,
      y: r * Math.sin(curDeg) + pointCenter.y
    };
    pEnd = {
      x: r * Math.cos(nextDeg) + pointCenter.x,
      y: r * Math.sin(nextDeg) + pointCenter.y
    };

    if (
      pref.aff.xx !== 1 ||
      pref.aff.xy !== 0 ||
      pref.aff.yx !== 0 ||
      pref.aff.yy !== 1
    ) {
      pBeg = getAffine(pBeg, pref);
      pEnd = getAffine(pEnd, pref);
    }

    // Projective
    if (
      pref.pro.xx !== 0 ||
      pref.pro.xy !== 0 ||
      pref.pro.wx !== 0 ||
      pref.pro.yx !== 0 ||
      pref.pro.yy !== 0 ||
      pref.pro.wy !== 0
    ) {
      pBeg = getProjective(pBeg, pref);
      pEnd = getProjective(pEnd, pref);
    }

    ctx.moveTo(pBeg.x * pref.cellToMm, pBeg.y * pref.cellToMm);
    ctx.lineTo(pEnd.x * pref.cellToMm, pEnd.y * pref.cellToMm);
  }
};

const addLine = function (pStart, pEnd) {
  figure.lines.push({
    pStart,
    pEnd
  });
};

const addArc = function (
  pointCenter,
  r,
  angleStart,
  angleEnd,
  counterClockwise = false
) {
  figure.arcs.push({
    pointCenter,
    r,
    angleStart,
    angleEnd,
    counterClockwise
  });
};

const getArcEndPoint = function (c1, c2, radius, angle) {
  return {
    x: c1 + Math.cos(degToRad(angle)) * radius,
    y: c2 + Math.sin(degToRad(angle)) * radius
  };
};
const degToRad = (deg) => deg * (Math.PI / 180);
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

  if (
    pref.aff.xx !== 1 ||
    pref.aff.xy !== 0 ||
    pref.aff.yx !== 0 ||
    pref.aff.yy !== 1
  ) {
    xArrow = getAffine(xArrow, pref);
    yArrow = getAffine(yArrow, pref);
  }

  if (
    pref.pro.xx !== 0 ||
    pref.pro.xy !== 0 ||
    pref.pro.wx !== 0 ||
    pref.pro.yx !== 0 ||
    pref.pro.yy !== 0 ||
    pref.pro.wy !== 0
  ) {
    xArrow = getProjective(xArrow, pref);
    xArrow.x *= pref.cellToMm;
    xArrow.y *= pref.cellToMm;
    yArrow = getProjective(yArrow, pref);
    yArrow.x *= pref.cellToMm;
    yArrow.y *= pref.cellToMm;
  }

  // X Axis
  drawArrow(
    ctx,
    pref.aff.ox || pref.pro.ox * pref.cellToMm,
    pref.aff.oy || pref.pro.oy * pref.cellToMm,
    xArrow.x,
    xArrow.y,
    '#fa0000'
  );
  // Y Axis
  drawArrow(
    ctx,
    pref.aff.ox || pref.pro.ox * pref.cellToMm,
    pref.aff.oy || pref.pro.oy * pref.cellToMm,
    yArrow.x,
    yArrow.y,
    '#63ff17'
  );
};
const createFigure = (pref) => {
  figure.addPoint('a', 10, 200);

  figure.addPoint('b', figure.points.a.x + pref.l.ab, figure.points.a.y);

  figure.addPoint(
    'c',
    figure.points.b.x,
    figure.points.b.y -
      (pref.l.la + pref.r.r4 - (pref.l.hi + pref.r.r3 - pref.l.eg + pref.r.r1))
  );

  figure.addPoint('r1', figure.points.c.x + pref.r.r1, figure.points.c.y);

  figure.addPoint('d', figure.points.r1.x, figure.points.c.y - pref.r.r1);

  figure.addPoint('e', figure.points.d.x + pref.l.de, figure.points.d.y);

  figure.addPoint('r2', figure.points.e.x, figure.points.e.y + pref.r.r2);

  // Count where point F will be
  const f = getArcEndPoint(
    figure.points.e.x,
    figure.points.e.y + pref.r.r2,
    pref.r.r2,
    315
  );

  figure.addPoint('f', f.x, f.y);

  figure.addPoint(
    'g',
    figure.points.f.x + pref.l.eg * Math.cos(Math.PI / 4),
    figure.points.e.y + pref.l.eg
  );

  figure.addPoint('h', figure.points.a.x + pref.l.il, figure.points.g.y);

  figure.addPoint('i', figure.points.h.x, figure.points.h.y - pref.l.hi);

  figure.addPoint('r3', figure.points.i.x - pref.r.r3, figure.points.i.y);

  figure.addPoint(
    'j',
    figure.points.i.x - pref.r.r3,
    figure.points.i.y - pref.r.r3
  );

  figure.addPoint(
    'k',
    figure.points.j.x - (pref.l.il - pref.r.r3 - pref.r.r4),
    figure.points.j.y
  );

  figure.addPoint('r4', figure.points.k.x, figure.points.k.y + pref.r.r4);

  figure.addPoint(
    'l',
    figure.points.k.x - pref.r.r4,
    figure.points.k.y + pref.r.r4
  );

  for (const point in figure.points) {
    // Landslide
    if (pref.ls.x !== 0 || pref.ls.y !== 0) {
      figure.points[point] = getLandslide(figure.points[point], pref);
    }
    // Rotations
    if (pref.angle !== 0)
      figure.points[point] = getRotation(figure.points[point], pref);
    if (point.includes('r')) continue;
    // Affine
    if (
      pref.aff.xx !== 1 ||
      pref.aff.xy !== 0 ||
      pref.aff.yx !== 0 ||
      pref.aff.yy !== 1
    )
      figure.points[point] = getAffine(figure.points[point], pref);
    // Projective
    if (
      pref.pro.xx !== 0 ||
      pref.pro.xy !== 0 ||
      pref.pro.wx !== 0 ||
      pref.pro.yx !== 0 ||
      pref.pro.yy !== 0 ||
      pref.pro.wy !== 0
    )
      figure.points[point] = getProjective(figure.points[point], pref);
  }

  addLine(figure.points.a, figure.points.b);
  addLine(figure.points.b, figure.points.c);
  addArc(figure.points.r1, pref.r.r1, 180 + pref.angle, 270 + pref.angle);
  addLine(figure.points.d, figure.points.e);
  addArc(figure.points.r2, pref.r.r2, 270 + pref.angle, 315 + pref.angle);
  addLine(figure.points.f, figure.points.g);
  addLine(figure.points.g, figure.points.h);
  addLine(figure.points.h, figure.points.i);
  addArc(figure.points.r3, pref.r.r3, pref.angle, -90 + pref.angle, true);
  addLine(figure.points.j, figure.points.k);
  addArc(
    figure.points.r4,
    pref.r.r4,
    -90 + pref.angle,
    -180 + pref.angle,
    true
  );
  addLine(figure.points.l, figure.points.a);
};

const renderFigure = function (ctx, pref) {
  ctx.beginPath();
  figure.lines.forEach((line) => {
    drawLine(ctx, pref, line.pStart, line.pEnd);
  });

  figure.arcs.forEach((arc) => {
    drawArc(
      arc.pointCenter,
      arc.r,
      arc.angleStart,
      arc.angleEnd,
      arc.counterClockwise,
      ctx,
      pref
    );
  });
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
};
const getLandslide = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [1, 0, 0],
      [0, 1, 0],
      [pref.ls.x, pref.ls.y, 1]
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
      [Math.cos(degToRad(pref.angle)), Math.sin(degToRad(pref.angle)), 0],
      [-Math.sin(degToRad(pref.angle)), Math.cos(degToRad(pref.angle)), 0],
      [
        -pref.center.x * (Math.cos(degToRad(pref.angle)) - 1) +
          pref.center.y * Math.sin(degToRad(pref.angle)),
        -pref.center.x * Math.sin(degToRad(pref.angle)) -
          pref.center.y * (Math.cos(degToRad(pref.angle)) - 1),
        1
      ]
    ]
  );
  point.x = res[0];
  point.y = res[1];

  return point;
};

const getAffine = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [pref.aff.xx, pref.aff.xy, 0],
      [pref.aff.yx, pref.aff.yy, 0],
      [pref.aff.ox, pref.aff.oy, 1]
    ]
  );
  point.x = res[0];
  point.y = res[1];

  return point;
};

const getProjective = (point, pref) => {
  const [res] = multiplyMatrices(
    [[point.x, point.y, 1]],
    [
      [pref.pro.xx * pref.pro.wx, pref.pro.xy * pref.pro.wx, pref.pro.wx],
      [pref.pro.yx * pref.pro.wy, pref.pro.yy * pref.pro.wy, pref.pro.wy],
      [pref.pro.ox * pref.pro.wo, pref.pro.oy * pref.pro.wo, pref.pro.wo]
    ]
  );
  point.x = res[0] / res[2];
  point.y = res[1] / res[2];

  return point;
};
export const renderFigureEvent = (e, canvas, pref) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  figure.lines = [];
  figure.arcs = [];

  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();

  pref.calcCellToMM();

  renderGridWithAxis(ctx, pref);

  // Creating Figure
  createFigure(pref);

  renderFigure(ctx, pref);
};
