export const preferences = {
  first: [0.307692, -0.531469, -0.461538, -0.293706, 5.401953, 8.655175, 0.4],
  second: [0.307692, -0.076923, 0.153846, -0.447552, -1.295248, 4.15299, 0.15],
  third: [0, 0.545455, 0.692308, -0.195804, -4.893637, 7.269794, 0.45],
  cellSize: 25,
  cellNum: 1,
  calcCellToMM() {
    this.cellToMm = this.cellSize / this.cellNum;
  },
};
