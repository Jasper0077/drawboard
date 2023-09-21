import { Point } from "../types";

export type PointerType = "mouse" | "pen" | "touch";

type _BaseElement = Readonly<{
  id: string;
  x: number;
  y: number;
  strokeColor: string;
  backgroundColor: string;
  strokeWidth: number;
  roughness: number;
  opacity: number;
  width: number;
  height: number;
  customData?: Record<string, any>;
}>;

export type SelectionElement = _BaseElement & {
  type: "selection";
};

export type RectangleElement = _BaseElement & {
  type: "rectangle";
};

export type DiamondElement = _BaseElement & {
  type: "diamond";
};

export type EllipseElement = _BaseElement & {
  type: "ellipse";
};

export type FreeDrawElement = _BaseElement &
  Readonly<{
    type: "freedraw";
    points: readonly Point[];
  }>;

export type LinearElement = _BaseElement &
  Readonly<{
    type: "line" | "arrow";
    points: readonly Point[];
  }>;

export type GenericElement =
  | SelectionElement
  | RectangleElement
  | DiamondElement
  | EllipseElement;

export type Element = GenericElement | FreeDrawElement | LinearElement;
