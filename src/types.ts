import { SHAPES, THEME } from "./constants";
import { Point as RoughPoint } from "roughjs/bin/geometry";

export type NormalizedZoomValue = number & { _brand: "normalizedZoom" };

export type Theme = (typeof THEME)[keyof typeof THEME];
export type Zoom = Readonly<{
  value: NormalizedZoomValue;
}>;

export type Point = Readonly<RoughPoint>;

export type AppState = {
  showWelcomeScreen: boolean;
  isLoading: boolean;
  errorMessage: React.ReactNode;
  viewModeEnabled: boolean;
  theme: Theme;
  activeTool: {
    type: typeof SHAPES[number],
    customType: null;
  }

  /** Basics */
  zoom: Zoom;
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  scrollX: number;
  scrollY: number;
};

type _BaseCanvasAppState = {
  zoom: AppState["zoom"];
  scrollX: AppState["scrollX"];
  scrollY: AppState["scrollY"];
  width: AppState["width"];
  height: AppState["height"];
  viewModeEnabled: AppState["viewModeEnabled"];
  offsetLeft: AppState["offsetLeft"];
  offsetTop: AppState["offsetTop"];
  theme: AppState["theme"];
};

export type CanvasAppState = Readonly<_BaseCanvasAppState>;
