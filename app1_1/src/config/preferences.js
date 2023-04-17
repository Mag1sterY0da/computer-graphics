export const preferences = {
  center: {
    x: 100,
    y: 120
  },
  angle: 0,
  cellSize: 25,
  cellNum: 10,
  l: {
    ab: 40,
    de: 61,
    eg: 40,
    hi: 108,
    la: 160,
    il: 230
  },
  r: {
    r1: 35,
    r2: 30,
    r3: 30,
    r4: 30
  },
  ls: {
    x: 0,
    y: 0
  },
  aff: {
    xx: 1,
    xy: 0,
    yx: 0,
    yy: 1,
    ox: 0,
    oy: 0
  },
  pro: {
    xx: 0,
    xy: 0,
    wx: 0,
    yx: 0,
    yy: 0,
    wy: 0,
    ox: 0,
    oy: 0,
    wo: 1000
  },
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  }
};
