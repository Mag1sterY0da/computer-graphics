export const preferences = {
  cellSize: 30,
  cellNum: 1,
  projection: {
    xy: true,
    xz: false,
    yz: false,
  },
  l: {
    a: 15,
    b: 10,
    c: 5,
  },
  r: {
    x: 15,
    y: 25,
    z: 25,
    steps: 20,
  },
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
