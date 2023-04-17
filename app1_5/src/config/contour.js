export const contour = {
  figure: [],
  addFigures(...figs) {
    this.figure.push(...figs);
  },
  clearFigures() {
    this.figure = [];
  },
};
