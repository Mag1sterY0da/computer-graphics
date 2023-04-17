export const contour = {
  points: [],
  addPoint(...points) {
    this.points.push(...points);
  },
  clearPoints() {
    this.points = [];
  },
};
