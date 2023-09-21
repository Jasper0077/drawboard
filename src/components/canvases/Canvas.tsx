import { useRef, useEffect } from "react";
import { CanvasAppState } from "../../types";

type CanvasProps = {
  appState: CanvasAppState;
  scale?: number;
};

const Canvas = (props: CanvasProps) => {
  const isComponentedMounted = useRef(false);

  useEffect(() => {
    if (!isComponentedMounted.current) {
      isComponentedMounted.current = true;
      return;
    }
  });

  return (
    <canvas
      style={{
        width: props.appState.width,
        height: props.appState.height
      }}
      width={props.appState.width * (props.scale || 1)}
      height={props.appState.height * (props.scale || 1)}
    >
      {"Drawing Canvas"}
    </canvas>
  );
};

export default Canvas;
