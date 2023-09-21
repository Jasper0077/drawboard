import { SHAPES } from "./constants";
import { AppState } from "./types";

export const distance = (x: number, y: number) => Math.abs(x - y);

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const assertNever = (
  value: never,
  message: string,
  softAssert?: boolean
): never => {
  if (softAssert) {
    console.error(message);
    return value;
  }

  throw new Error(message);
};

export const updateActiveTool = (
  appState: Pick<AppState, "activeTool">,
  data:
    | {
        type:
          | (typeof SHAPES)[number]["value"]
          | "eraser"
          | "hand"
          | "frame"
          | "embeddable";
      }
    | { type: "custom"; customType: string }
): AppState["activeTool"] => {
  if (data.type === "custom") {
    return {
      ...appState.activeTool,
      type: "custom"
    };
  }

  return {
    ...appState.activeTool,
    type: data.type,
    customType: null
  };
};
