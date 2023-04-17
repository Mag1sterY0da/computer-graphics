export const contour = {
  figure: [],
  pictureFigure: [],
  addFigures(...figs) {
    this.figure.push(...figs);
  },
  addPictureFigures(...figs) {
    this.pictureFigure.push(...figs);
  },
  clearFigures() {
    this.figure = [];
  },
  clearPictureFigures() {
    this.pictureFigure = [];
  },
};
