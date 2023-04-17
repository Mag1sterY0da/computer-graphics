export const contour = {
  figure: [],
  segmentPoints: [],
  movablePoints: [],
  referencePoints: [],
  skeletonLines: [],
  addFigures(...figs) {
    this.figure.push(...figs);
  },
  addMovablePoint(p, name) {
    this.movablePoints.push({ ...p, name });
  },
  addSegmentPoint(p) {
    this.segmentPoints.push(p);
  },
  addReferencePoint(p) {
    this.referencePoints.push(p);
  },
  addSkeletonLine(pStart, pEnd) {
    this.skeletonLines.push({
      pStart: { x: pStart.x, y: pStart.y },
      pEnd: { x: pEnd.x, y: pEnd.y },
    });
  },
  clearFigures() {
    this.figure = [];
  },
  clearSegmentPoints() {
    this.segmentPoints = [];
  },
  clearMovablePoints() {
    this.movablePoints = [];
  },
  clearReferencePoints() {
    this.referencePoints = [];
  },
  clearSkeletonLines() {
    this.skeletonLines = [];
  },
};
