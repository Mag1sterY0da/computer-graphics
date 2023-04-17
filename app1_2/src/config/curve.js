export const curve = {
  points: [],
  curvePoint: {},
  tanLine: [],
  normLine: [],
  asyLine: [],
  inflPoint: {},
  addPoint(x, y) {
    this.points.push({ x, y });
  },
  clearPoints() {
    this.points = [];
  },
};
