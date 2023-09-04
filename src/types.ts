import { THEME } from "./constants";

export type NormalizedZoomValue = number & { _brand: "normalizedZoom" };

export type Theme = (typeof THEME)[keyof typeof THEME];
export type Zoom = Readonly<{
  value: NormalizedZoomValue;
}>;

export type AppState = {
  showWelcomeScreen: boolean;
  isLoading: boolean;
  errorMessage: React.ReactNode;
  viewModeEnabled: boolean;
  theme: Theme;

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
