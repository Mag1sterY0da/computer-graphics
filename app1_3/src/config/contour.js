export const contour = {
  figures: [],
  segmentPoints: [],
  referencePoints: [],
  skeletonLines: [],
  addFigures(...figs) {
    this.figures.push(...figs);
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
    this.figures = [];
  },
  clearSegmentPoints() {
    this.segmentPoints = [];
  },
  clearReferencePoints() {
    this.referencePoints = [];
  },
  clearSkeletonLines() {
    this.skeletonLines = [];
  },
};
