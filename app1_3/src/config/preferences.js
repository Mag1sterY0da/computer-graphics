export const preferences = {
  tStart: 0,
  tEnd: 1,
  tStep: 0.05,
  an: {
    stepsNum: 5,
    duration: 200,
    showSkeleton: true,
  },
  rot: {
    x: 0,
    y: 0,
    angle: 0,
  },
  ls: {
    x: 0,
    y: 0,
  },
  cellSize: 35,
  cellNum: 1,
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
