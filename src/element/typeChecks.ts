import { AppState } from "../types";
import { FreeDrawElement, Element, LinearElement } from "./types";

export const isLinearElementType = (
  elementType: AppState["activeTool"]["type"]["value"]
): boolean => {
  return (
    elementType === "arrow" || elementType === "line" // || elementType === "freedraw"
  );
};

export const isLinearElement = (
  element?: Element | null
): element is LinearElement => {
  return element != null && isLinearElementType(element.type);
};

export const isFreeDrawElement = (
  element?: Element | null
): element is FreeDrawElement => {
  return element != null && isFreeDrawElementType(element.type);
};

export const isFreeDrawElementType = (
  elementType: Element["type"]
): boolean => {
  return elementType === "freedraw";
};
