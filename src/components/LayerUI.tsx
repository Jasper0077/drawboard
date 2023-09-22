import clsx from "clsx";
import { FixedContainer } from "./FixedContainer";
import Stack from "./Stack";
import { Section } from "./Section";
import { AppState } from "../types";
import { ShapesSwitcher } from "./Actions";
import { Island } from "./Island";

import "./LayerUI.scss";
import "./Toolbar.scss";

export interface LayerUIProps {
  interactiveCanvas: HTMLCanvasElement;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  children?: React.ReactNode;
}

const LayerUI: React.FC<LayerUIProps> = ({
  interactiveCanvas,
  appState,
  setAppState,
  children
}: LayerUIProps) => {
  const renderFixedContainer = () => {
    return (
      <FixedContainer side="top">
        <div className="App-menu App-menu-top">
          <Stack.Col gap={6} className={clsx("App-menu_top__left")}>
            {/** TODO */}
          </Stack.Col>
          <Section heading={"shapes"} className="shapes-section">
            <Stack.Col gap={4} align="start">
              <Stack.Row>
                <Island padding={1} className={clsx("App-toolbar")}>
                  <ShapesSwitcher
                    appState={appState}
                    interactiveCanvas={interactiveCanvas}
                    activeTool={appState.activeTool}
                    setAppState={setAppState}
                  />
                </Island>
              </Stack.Row>
            </Stack.Col>
          </Section>
        </div>
      </FixedContainer>
    );
  };
  return (
    <>
      <div className={clsx("layer-ui__wrapper")}>{renderFixedContainer()}</div>
    </>
  );
};

export default LayerUI;
