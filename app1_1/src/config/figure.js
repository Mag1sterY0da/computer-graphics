export const figure = {
  points: {},
  lines: [],
  arcs: [],
  addPoint(name, x, y) {
    this.points?.name
      ? (this.points.name = { x, y })
      : (this.points[name] = { x, y });
  }
};
