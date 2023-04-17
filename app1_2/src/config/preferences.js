export const preferences = {
  alpha: 0,
  beta: 180,
  step: 2,
  a: 3,
  an: {
    start: 0.5,
    end: 4,
    step: 0.1,
    duration: 100,
  },
  rot: {
    x: 0,
    y: 0,
    angle: 0,
  },
  ls: {
    x: 20,
    y: 20,
  },
  phi: 45,
  tna: {
    tang: true,
    norm: true,
    asy: true,
    infl: true,
  },
  arcLength: 0,
  square: 0,
  radiusOfCurvature: 0,
  cellSize: 25,
  cellNum: 5,
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
