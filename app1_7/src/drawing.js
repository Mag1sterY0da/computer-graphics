import { contour } from './config/contour';

export const init = (canvas, renderSectionRef, pref) => {
  const ctx = canvas.getContext('2d');
  // Transform Y Axis
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  pref.calcCellToMM();

  // renderGridWithAxis(ctx, pref);
};

const drawPoint = (ctx, pref, point, color) => {
  ctx.beginPath();
  ctx.arc(point.x * pref.cellToMm, point.y * pref.cellToMm, 2, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const matrixDot = (a, b) => {
  const mx = [a, b];
  const cols = mx.map(m => m[0].length);
  if (!mx.every((m, i) => m.every(row => row.length === cols[i]))) {
    throw new Error(
      'All rows in a matrix must have the same number of columns'
    );
  } else if (cols[0] !== b.length) {
    throw new Error(
      'The number of columns in the 1st matrix must be equal to the number of rows in the 2nd matrix'
    );
  }

  // Calculations
  return a.map(rowA =>
    b[0].map((_, xb) =>
      rowA.reduce((acc, itemA, yb) => acc + itemA * b[yb][xb], 0)
    )
  );
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const transform = (matrix, p) => {
  const transformationMatrix = [
    [matrix[0], matrix[2]],
    [matrix[1], matrix[3]],
  ];
  const [res] = matrixDot([[p.x, p.y]], transformationMatrix);
  return { x: res[0] + matrix[4], y: res[1] + matrix[5] };
};

const moveToCenter = p => ({ x: p.x * 1.5, y: p.y * -1.5 });

const createContour = pref => {
  const first = pref.first;
  const second = pref.second;
  const third = pref.third;

  let p = { x: 0, y: 0 },
    curPoint = { x: 0, y: 0 };

  for (let i = 0; i < 1000; i++) {
    const random = getRandomInt(0, 100);
    if (random < 33) {
      curPoint = transform(first, p);
    } else if (random >= 33 && random < 66) {
      curPoint = transform(second, p);
    } else if (random >= 66 && random <= 100) {
      curPoint = transform(third, p);
    } else {
      console.log('Error in random');
    }
    p = curPoint;
    curPoint = moveToCenter(curPoint);
    contour.addPoint(curPoint);
  }
};

const renderContour = function (ctx, pref) {
  ctx.beginPath();
  const pCenter = {
    x: pref.width / pref.cellToMm / 2,
    y: pref.height / pref.cellToMm / 2,
  };
  contour.points.forEach(p => {
    p.x = pCenter.x + p.x;
    p.y = pCenter.y - p.y;
    drawPoint(ctx, pref, p, 'black');
  });
  ctx.stroke();
  ctx.closePath();
};

export const renderContourEvent = (e, canvas, pref) => {
  e.preventDefault();

  const ctx = canvas.getContext('2d');

  contour.clearPoints();

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

  // Creating Curve points
  createContour(pref);

  renderContour(ctx, pref);
};
