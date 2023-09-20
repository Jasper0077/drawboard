import { LinearElement } from "./element/types";
import { NormalizedZoomValue, Zoom } from "./types";

export const LINE_CONFIRM_THRESHOLD = 8; // px

export const distance2d = (x1: number, y1: number, x2: number, y2: number) => {
  const xd = x2 - x1;
  const yd = y2 - y1;
  return Math.hypot(xd, yd);
};

export const isPathALoop = (
  points: LinearElement["points"],
  /** supply if you want the loop detection to account for current zoom */
  zoomValue: Zoom["value"] = 1 as NormalizedZoomValue,
): boolean => {
  if (points.length >= 3) {
    const [first, last] = [points[0], points[points.length - 1]];
    const distance = distance2d(first[0], first[1], last[0], last[1]);

    // Adjusting LINE_CONFIRM_THRESHOLD to current zoom so that when zoomed in
    // really close we make the threshold smaller, and vice versa.
    return distance <= LINE_CONFIRM_THRESHOLD / zoomValue;
  }
  return false;
};
