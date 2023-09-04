import { THEME } from "./constants";
import { AppState, NormalizedZoomValue } from "./types";

export const getDefaultAppState = (): Omit<
  AppState,
  "offsetTop" | "offsetLeft" | "width" | "height"
> => ({
  showWelcomeScreen: false,
  isLoading: false,
  errorMessage: null,
  viewModeEnabled: false,
  theme: THEME.LIGHT,
  zoom: {
    value: 1 as NormalizedZoomValue
  },
  scrollX: 0,
  scrollY: 0
});
