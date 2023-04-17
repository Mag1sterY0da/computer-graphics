export const preferences = {
  cellSize: 30,
  cellNum: 1,
  uStep: 10,
  vStep: 10,
  tStart: 0,
  tEnd: 1,
  tStep: 0.05,
  l: {
    r: 5,
  },
  lsContour: {
    x: 10,
    y: 10,
    z: 10,
  },
  rContour: {
    x: 15,
    y: 25,
    z: 25,
    steps: 20,
  },
  lsPicture: {
    x: 2,
    y: 2,
  },
  rPicture: {
    x: 10,
    y: 10,
    angle: 90,
  },
  projection: {
    xy: false,
    xz: true,
    yz: false,
  },
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
