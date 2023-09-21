import { AppState } from "../types";
import { SHAPES } from "../constants";
import { capitalizeString, updateActiveTool } from "../utils";
import clsx from "clsx";
import { ToolButton } from "./ToolButton";

export const ShapesSwitcher = ({
  interactiveCanvas,
  activeTool,
  setAppState,
  appState
}: {
  interactiveCanvas: HTMLCanvasElement | null;
  activeTool: AppState["activeTool"];
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  appState: AppState;
}) => {
  return (
    <>
      {SHAPES.map(({ value, icon, key, numericKey, fillable }, index) => {
        const label = value;
        const letter =
          key && capitalizeString(typeof key === "string" ? key : key[0]);
        const shortcut = letter
          ? `${letter} ${"helperDialog.or"} ${numericKey}`
          : `${numericKey}`;
        return (
          <ToolButton
            className={clsx("Shape", { fillable })}
            key={value}
            type="radio"
            icon={icon}
            checked={activeTool.type === value}
            name="editor-current-shape"
            title={`${capitalizeString(label)} - ${shortcut}}`}
            keyBindingLabel={numericKey || letter}
            aria-label={capitalizeString(label)}
            aria-keyshortcuts={shortcut}
            data-testid={`toolbar-${value}`}
            // TODO: set pen mode
            // onPointerDown={({ pointerType }) => {
            //   TODO: set pen mode
            //   if (!appState.penDetected && pointerType === "pen") {
            //     setAppState({
            //       penDetected: true,
            //       penMode: true
            //     })
            //   }
            // }}
            onChange={({ pointerType }) => {
              if (appState.activeTool.type !== value) {
                // TODO: track event
                // trackEvent("toolbar", value, "ui");
              }
              const nextActiveTool = updateActiveTool(appState, {
                type: value
              });
              setAppState((state) => ({
                ...state,
                activeTool: nextActiveTool
              }));
            }}
          />
        );
      })}
      <div className="App-toolbar__divider" />
      {/** TODO: implement dropdown */}
    </>
  );
};
