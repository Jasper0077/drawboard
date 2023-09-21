import { RoughGenerator } from "roughjs/bin/generator";
import {
  DiamondElement,
  Element,
  FreeDrawElement,
  SelectionElement
} from "../element/types";
import { Drawable } from "roughjs/bin/core";
import { ElementShapes } from "./types";
import { assertNever } from "../utils";

// TODO: implement freedraw and diamond
export const generateElementShape = (
  element: Exclude<
    Element,
    SelectionElement | FreeDrawElement | DiamondElement
  >,
  generator: RoughGenerator
): Drawable | Drawable[] | null => {
  switch (element.type) {
    case "rectangle": {
      let shape: ElementShapes[(typeof element)["type"]];
      // this is for rendering the stroke/bg of the embeddable, especially
      // when the src url is not set
      shape = generator.rectangle(0, 0, element.width, element.height);
      return shape;
    }
    case "ellipse": {
      const shape: ElementShapes[typeof element.type] = generator.ellipse(
        element.width / 2,
        element.height / 2,
        element.width,
        element.height
      );
      return shape;
    }
    case "line":
    case "arrow": {
      let shape: ElementShapes[typeof element.type];

      // points array can be empty in the beginning, so it is important to add
      // initial position to it
      const points = element.points.length ? element.points : [[0, 0]];

      // curve is always the first element
      // this simplifies finding the curve for an element
      shape = [generator.curve(points as [number, number][])];

      // add lines only in arrow
      if (element.type === "arrow") {
        // TODO
      }
      return shape;
    }
    default: {
      assertNever(
        element,
        `generateElementShape(): Unimplemented type ${(element as any)?.type}`
      );
      return null;
    }
  }
};
