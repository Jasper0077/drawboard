import clsx from "clsx";
import "./App.css";
import { getDefaultAppState } from "./appState";
import LayerUI from "./components/LayerUI";
import Canvas from "./components/canvases/Canvas";
import { AppState } from "./types";
import React from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs/bin/rough";

interface AppProps {
}

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
  offsetTop: 0
});
AppStateContext.displayName = "AppStateContext";

export const useExcalidrawAppState = () => React.useContext(AppStateContext);

const App: React.FC<AppProps> = (props: AppProps) => {
  const [appState, setAppState] = React.useState<AppState>({
    ...getDefaultAppState(),
    ...getCanvasOffsets(),
    width: window.innerWidth,
    height: window.innerHeight
  });
  const canvas = document.createElement("canvas");
  const rc = rough.canvas(canvas);
  return (
    <div className={clsx("drawboard drawboard-container")}>
      <AppStateContext.Provider value={appState}>
        <LayerUI
          interactiveCanvas={canvas}
          appState={appState}
          setAppState={setAppState}
        />
        <Canvas appState={appState} />
      </AppStateContext.Provider>
      <h1>efneopnfweopfe</h1>
    </div>
  );
};

export default App;
