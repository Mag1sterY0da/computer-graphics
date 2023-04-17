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

const getSmoothB = (p1, p2, p3) => ({
  x: p2.x + (getLength(p2, p3) * (p2.x - p1.x)) / getLength(p1, p2),
  y: p2.y + (getLength(p2, p3) * (p2.y - p1.y)) / getLength(p1, p2),
});

const getLength = (p1, p2) =>
  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

export const createContour = pref => {
  const cloud1 = {
    name: 'cloud1',
    points: [
      [
        { x: 11.44, y: 15.44, bp: true },
        { x: 10.8, y: 19.5 },
        { x: 8.2, y: 19.18, bp: false },
      ],
      [
        { x: 8.2, y: 19.18, bp: false },
        { x: 5.7, y: 18.86 },
        { x: 6.2, y: 15.92, bp: false },
      ],
      [
        { x: 6.2, y: 15.92, bp: false },
        { x: 6.56, y: 14.12 },
        { x: 8.6, y: 14, bp: true },
      ],
      [
        { x: 8.6, y: 14, bp: true },
        { x: 4.95, y: 13.5 },
        { x: 5.4, y: 17.2, bp: false },
      ],
      [
        { x: 5.4, y: 17.2, bp: false },
        { x: 6, y: 20.6 },
        { x: 10, y: 19.6, bp: false },
      ],
      [
        { x: 10, y: 19.6, bp: false },
        { x: 12.4, y: 18 },
        { x: 11.44, y: 15.44, bp: true },
      ],
    ],
  };

  const cloud2 = {
    name: 'cloud2',
    points: [
      [
        { x: 11.65, y: 17.63, bp: true },
        { x: 15.72, y: 18.91 },
        { x: 16.18, y: 16.25, bp: true },
      ],
      [
        { x: 16.18, y: 16.25, bp: true },
        { x: 15.86, y: 16.18 },
        { x: 15.53, y: 16.11, bp: true },
      ],
      [
        { x: 15.53, y: 16.11, bp: true },
        { x: 15.19, y: 18.42 },
        { x: 11.65, y: 17.63, bp: true },
      ],
    ],
  };

  const cloud3 = {
    name: 'cloud3',
    points: [
      [
        { x: 15.47, y: 13.34, bp: true },
        { x: 11.58, y: 12.37 },
        { x: 14.4, y: 14.8, bp: false },
      ],
      [
        { x: 14.4, y: 14.8, bp: false },
        { x: 17.78, y: 16.73 },
        { x: 17.8, y: 14.1, bp: false },
      ],
      [
        { x: 17.8, y: 14.1, bp: false },
        { x: 16.92, y: 10.24 },
        { x: 10.28, y: 10.68, bp: true },
      ],
      [
        { x: 10.28, y: 10.68, bp: true },
        { x: 15.79, y: 9.02 },
        { x: 18.9, y: 13.78, bp: false },
      ],
      [
        { x: 18.9, y: 13.78, bp: false },
        { x: 19.5, y: 16.5 },
        { x: 16.77, y: 16.14, bp: false },
      ],
      [
        { x: 16.77, y: 16.14, bp: false },
        { x: 13.77, y: 15.8 },
        { x: 12.6, y: 13.35, bp: false },
      ],
      [
        { x: 12.6, y: 13.35, bp: false },
        { x: 12.4, y: 11.95 },
        { x: 15.47, y: 13.34, bp: true },
      ],
    ],
  };

  const cloud4 = {
    name: 'cloud4',
    points: [
      [
        { x: 4.47, y: 13.85, bp: true },
        { x: -0.22, y: 13.7 },
        { x: 2.05, y: 11.25, bp: false },
      ],
      [
        { x: 2.05, y: 11.25, bp: false },
        { x: 5.42, y: 8.51 },
        { x: 11.26, y: 12.03, bp: true },
      ],
      [
        { x: 11.26, y: 12.03, bp: true },
        { x: 11.46, y: 11.93 },
        { x: 11.65, y: 11.837, bp: true },
      ],
      [
        { x: 11.65, y: 11.837, bp: true },
        { x: 6.03, y: 7.97 },
        { x: 1.94, y: 10.42, bp: false },
      ],
      [
        { x: 1.94, y: 10.42, bp: false },
        { x: -1.41, y: 12.77 },
        { x: 1.9, y: 14, bp: false },
      ],
      [
        { x: 1.9, y: 14, bp: false },
        { x: 3.33, y: 14.37 },
        { x: 4.47, y: 13.85, bp: true },
      ],
    ],
  };

  const threshold = {
    name: 'threshold',
    points: [
      [
        { x: 10.4, y: 10.06, bp: true },
        { x: 10.46, y: 10.09 },
        { x: 11.29, y: 9.9, bp: true },
      ],
      [
        { x: 11.29, y: 9.9, bp: true },
        { x: 9.63, y: 7.98 },
        { x: 7.53, y: 5.64, bp: true },
      ],
      [
        { x: 7.53, y: 5.64, bp: true },
        { x: 8.77, y: 6.21 },
        { x: 10.01, y: 6.82, bp: false },
      ],
      [
        { x: 10.01, y: 6.82, bp: false },
        { x: 11.3, y: 7.25 },
        { x: 10.62, y: 6.1, bp: false },
      ],
      [
        { x: 10.62, y: 6.1, bp: false },
        { x: 8.9, y: 4.4 },
        { x: 7.4, y: 2.93, bp: true },
      ],
      [
        { x: 6.88, y: 2.97, bp: false },
        { x: 9.14, y: 5.13 },
        { x: 10.045, y: 6.285, bp: true },
      ],
      [
        { x: 10.045, y: 6.285, bp: true },
        { x: 8.175, y: 5.1 },
        { x: 7.484, y: 5.14, bp: false },
      ],
      [
        { x: 7.484, y: 5.14, bp: false },
        { x: 6.07, y: 4.96 },
        { x: 7, y: 6.3, bp: false },
      ],
      [
        { x: 7, y: 6.3, bp: false },
        { x: 9.15, y: 8.68 },
        { x: 10.4, y: 10.06, bp: true },
      ],
    ],
  };

  const arrow = {
    name: 'arrow',
    points: [
      [
        { x: 6.88, y: 2.67, bp: true },
        { x: 7.57, y: 2.99 },
        { x: 8.18, y: 3.27, bp: false },
      ],
      [
        { x: 8.18, y: 3.27, bp: false },
        { x: 9.695, y: 3.7 },
        { x: 8.3, y: 2.72, bp: false },
      ],
      [
        { x: 8.3, y: 2.72, bp: false },
        { x: 6.66, y: 1.9 },
        { x: 5.25, y: 1.16, bp: true },
      ],
      [
        { x: 5.25, y: 1.16, bp: true },
        { x: 6.25, y: 2.89 },
        { x: 6.54, y: 4.2, bp: true },
      ],
      [
        { x: 6.54, y: 4.2, bp: true },
        { x: 6.933, y: 4.39 },
        { x: 6.99, y: 4.226, bp: true },
      ],
      [
        { x: 6.99, y: 4.226, bp: false },
        { x: 6.947, y: 3.61 },
        { x: 6.88, y: 2.67, bp: true },
      ],
    ],
  };

  let dropNum = 0;
  const getDrop = (x, y) => {
    dropNum++;
    return {
      name: `drop${dropNum}`,
      points: [
        [
          { x: 11.47 + x, y: 0.707 + y, bp: true },
          { x: 12.34 + x, y: 1.934 + y },
          { x: 13.014 + x, y: 2.74 + y, bp: true },
        ],
        [
          { x: 13.014 + x, y: 2.74 + y, bp: true },
          { x: 13.59 + x, y: 2.807 + y },
          { x: 13.56 + x, y: 2.567 + y, bp: true },
        ],
        [
          { x: 13.56 + x, y: 2.567 + y, bp: true },
          { x: 13.48 + x, y: 2.35 + y },
          { x: 11.788 + x, y: 0.63 + y, bp: true },
        ],
        [
          { x: 11.788 + x, y: 0.63 + y, bp: true },
          { x: 11.602 + x, y: 0.623 + y },
          { x: 11.47 + x, y: 0.707 + y, bp: true },
        ],
      ],
    };
  };

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

  // Segment points, Reference points, Skeleton lines
  contour.figure = contour.figure.map(fig =>
    fig.points.map((l, li) => {
      const [p0, p1, p2] = l;
      const newLine = [];

      if (
        p1.x === pref.p.selected.x &&
        p1.y === pref.p.selected.y &&
        !fig.points[li + 1][1].bp
      ) {
        p1.x += pref.p.x;
        p1.y += pref.p.y;
        fig.points[li + 1][1] = getSmoothB(p1, p2, fig.points[li + 1][1]);
      }

      contour.addSegmentPoint(p0);
      !p2.bp
        ? contour.addMovablePoint(p1, fig.name)
        : contour.addReferencePoint(p1);
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

const renderContour = function (ctx, pref) {
  ctx.beginPath();
  let curPoint;
  contour.figure.forEach(fig =>
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

  contour.segmentPoints.forEach(p => drawDot(ctx, pref, p, '#0a71d7'));
  contour.referencePoints.forEach(p => drawDot(ctx, pref, p, '#fc1111'));
  contour.movablePoints.forEach(p => drawDot(ctx, pref, p, '#34e80c'));
  contour.skeletonLines.forEach(l => drawLine(ctx, pref, l.pStart, l.pEnd));
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#919191';
  ctx.stroke();

  ctx.closePath();
};

export const renderContourEvent = (e, canvas, pref) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearFigures();
  contour.clearMovablePoints();
  contour.clearSegmentPoints();
  contour.clearReferencePoints();
  contour.clearSkeletonLines();

  clearAndRender(ctx, canvas, pref);
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
  createContour(pref);

  renderContour(ctx, pref);
};
