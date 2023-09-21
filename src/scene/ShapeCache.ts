import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import {
  DiamondElement,
  Element,
  FreeDrawElement,
  SelectionElement
} from "../element/types";
import { elementWithCanvasCache } from "../renderer/renderElement";
import { ElementShape, ElementShapes } from "./types";
import { generateElementShape } from "./shapes";

export class ShapeCache {
  private static rg = new RoughGenerator();
  private static cache = new WeakMap<Element, ElementShape>();

  /**
   * Retrieves shape from cache if available. Use this only if shape
   * is optional and you have a fallback in case it's not cached.
   */
  public static get = <T extends Element>(element: T) => {
    return ShapeCache.cache.get(
      element
    ) as T["type"] extends keyof ElementShapes
      ? ElementShapes[T["type"]] | undefined
      : ElementShape | undefined;
  };

  public static set = <T extends Element>(
    element: T,
    shape: T["type"] extends keyof ElementShapes
      ? ElementShapes[T["type"]]
      : Drawable
  ) => ShapeCache.cache.set(element, shape);

  public static delete = (element: Element) => ShapeCache.cache.delete(element);

  public static destroy = () => {
    ShapeCache.cache = new WeakMap();
  };

  /**
   * Generates & caches shape for element if not already cached, otherwise
   * returns cached shape.
   */
  public static generateElementShape = <
    T extends Exclude<
      Element,
      SelectionElement | FreeDrawElement | DiamondElement
    >
  >(
    element: T,
    isExporting = false
  ) => {
    // when exporting, always regenerated to guarantee the latest shape
    const cachedShape = isExporting ? undefined : ShapeCache.get(element);

    // `null` indicates no rc shape applicable for this element type,
    // but it's considered a valid cache value (= do not regenerate)
    if (cachedShape !== undefined) {
      return cachedShape;
    }

    elementWithCanvasCache.delete(element);

    const shape = generateElementShape(
      element,
      ShapeCache.rg
    ) as T["type"] extends keyof ElementShapes
      ? ElementShapes[T["type"]]
      : Drawable | null;

    ShapeCache.cache.set(element, shape);

    return shape;
  };
}
