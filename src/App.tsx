import "./App.css";
import { getDefaultAppState } from "./appState";
import Canvas from "./components/canvases/Canvas";
import { AppState } from "./types";
import React from "react";

interface AppProps {};
const defaultAppState = getDefaultAppState();
const getCanvasOffsets = (): Pick<AppState, "offsetTop" | "offsetLeft"> => ({
  // if (this.excalidrawContainerRef?.current) {
  //   const excalidrawContainer = this.excalidrawContainerRef.current;
  //   const { left, top } = excalidrawContainer.getBoundingClientRect();
  //   return {
  //     offsetLeft: left,
  //     offsetTop: top,
  //   };
  // }
    offsetLeft: 0,
    offsetTop: 0
});

const AppStateContext = React.createContext<AppState>({
  ...getDefaultAppState(),
  width: 0,
  height: 0,
  offsetLeft: 0,
  offsetTop: 0,
});
AppStateContext.displayName = "AppStateContext";

export const useExcalidrawAppState = () =>
  React.useContext(AppStateContext);


const App: React.FC<AppProps> = (props: AppProps) => {
  const [state, setState] = React.useState<AppState>({
    ...getDefaultAppState(),
    ...getCanvasOffsets(),
    width: window.innerWidth,
    height: window.innerHeight
  });
  return (
    <AppStateContext.Provider value={state}>
      <Canvas appState={state} />
    </AppStateContext.Provider>
  )
}

export default App;
