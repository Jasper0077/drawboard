import { COLOR_PALETTE } from "./colors";
import {
  SelectionIcon,
  RectangleIcon,
  DiamondIcon,
  EllipseIcon,
  ArrowIcon,
  LineIcon,
  FreedrawIcon
} from "./components/icons";
import { Element } from "./element/types";
import { KEYS } from "./keys";

export const isDarwin = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export const THEME = {
  LIGHT: "light",
  DARK: "dark"
} as const;

export const SHAPES = [
  {
    icon: SelectionIcon,
    value: "selection",
    key: KEYS.V,
    numericKey: KEYS["1"],
    fillable: true
  },
  {
    icon: RectangleIcon,
    value: "rectangle",
    key: KEYS.R,
    numericKey: KEYS["2"],
    fillable: true
  },
  {
    icon: DiamondIcon,
    value: "diamond",
    key: KEYS.D,
    numericKey: KEYS["3"],
    fillable: true
  },
  {
    icon: EllipseIcon,
    value: "ellipse",
    key: KEYS.O,
    numericKey: KEYS["4"],
    fillable: true
  },
  {
    icon: ArrowIcon,
    value: "arrow",
    key: KEYS.A,
    numericKey: KEYS["5"],
    fillable: true
  },
  {
    icon: LineIcon,
    value: "line",
    key: KEYS.L,
    numericKey: KEYS["6"],
    fillable: true
  },
  {
    icon: FreedrawIcon,
    value: "freedraw",
    key: [KEYS.P, KEYS.X],
    numericKey: KEYS["7"],
    fillable: false
  }
];

export const DEFAULT_ELEMENT_PROPS: {
  strokeColor: Element["strokeColor"];
  backgroundColor: Element["backgroundColor"];
  strokeWidth: Element["strokeWidth"];
  roughness: Element["roughness"];
  opacity: Element["opacity"];
} = {
  strokeColor: COLOR_PALETTE.black,
  backgroundColor: COLOR_PALETTE.transparent,
  strokeWidth: 1,
  roughness: 1,
  opacity: 100
};
