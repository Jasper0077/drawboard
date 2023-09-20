import { DEFAULT_ELEMENT_PROPS } from "../constants";
import { randomId } from "../random";
import { MarkOptional, Merge } from "../utility-types";
import { GenericElement, Element } from "./types";

export type ElementConstructorOpts = MarkOptional<
  Omit<GenericElement, "id" | "type">,
  | "width"
  | "height"
  | "strokeColor"
  | "backgroundColor"
  | "roughness"
  | "strokeWidth"
  | "opacity"
>;

const _newElementBase = <T extends Element>(
  type: T["type"],
  {
    x,
    y,
    strokeColor = DEFAULT_ELEMENT_PROPS.strokeColor,
    backgroundColor = DEFAULT_ELEMENT_PROPS.backgroundColor,
    strokeWidth = DEFAULT_ELEMENT_PROPS.strokeWidth,
    roughness = DEFAULT_ELEMENT_PROPS.roughness,
    opacity = 100,
    width = 0,
    height = 0,
    ...rest
  }: ElementConstructorOpts & Omit<Partial<Element>, "type">
) => {
  const element: Merge<GenericElement, { type: T["type"] }> = {
    id: rest.id || randomId(),
    type,
    x,
    y,
    width,
    height,
    strokeColor,
    backgroundColor,
    strokeWidth,
    roughness,
    opacity,
  }

  return element;
}

export const newElement = (
  opts: {
    type: GenericElement["type"];
  } & ElementConstructorOpts,
): GenericElement => _newElementBase<GenericElement>(opts.type, opts);
