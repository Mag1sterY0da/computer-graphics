export const preferences = {
  tStart: 0,
  tEnd: 1,
  tStep: 0.05,
  cellSize: 35,
  cellNum: 1,
  p: {
    x: 0.2,
    y: 0.2,
    selected: {},
  },
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
