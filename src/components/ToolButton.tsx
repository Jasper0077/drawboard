import { nanoid } from "nanoid";
import { PointerType } from "../element/types";
import React from "react";
import { AbortError } from "../errors";
import clsx from "clsx";
import Spinner from "./Spinner";

export type ToolButtonSize = "small" | "medium";
type _ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolButtonSize;
  keyBindingLabel?: string | null;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
};

type ToolButtonProps =
  | (_ToolButtonBaseProps & {
      type: "button";
      children?: React.ReactNode;
      onClick?(event: React.MouseEvent): void;
    })
  | (_ToolButtonBaseProps & {
      type: "submit";
      children?: React.ReactNode;
      onClick?(event: React.MouseEvent): void;
    })
  | (_ToolButtonBaseProps & {
      type: "icon";
      children?: React.ReactNode;
      onClick?(): void;
    })
  | (_ToolButtonBaseProps & {
      type: "radio";
      checked: boolean;
      onChange?(data: { pointerType: PointerType | null }): void;
      onPointerDown?(data: { pointerType: PointerType }): void;
    });

export const ToolButton = React.forwardRef((props: ToolButtonProps, ref) => {
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);
  const sizeCn = `ToolIcon_size_${props.size}`;

  const [isLoading, setIsLoading] = React.useState(false);

  const isMountedRef = React.useRef(true);

  const onClick = async (event: React.MouseEvent) => {
    const ret = "onClick" in props && props.onClick?.(event);

    if (ret && "then" in ret) {
      try {
        setIsLoading(true);
        await ret;
      } catch (error: any) {
        if (!(error instanceof AbortError)) {
          throw error;
        } else {
          console.warn(error);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
  };

  React.useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    []
  );

  const lastPointerTypeRef = React.useRef<PointerType | null>(null);
  if (
    props.type === "button" ||
    props.type === "icon" ||
    props.type === "submit"
  ) {
    const type = (props.type === "icon" ? "button" : props.type) as
      | "button"
      | "submit";
    return (
      <button
        className={clsx(
          "ToolIcon_type_button",
          sizeCn,
          props.className,
          props.visible && !props.hidden
            ? "ToolIcon_tupe_button--show"
            : "ToolIcon_type_button--hide",
          {
            ToolIcon: !props.hidden,
            "ToolIcon--selected": props.selected,
            "ToolIcon--plain": props.type === "icon"
          }
        )}
        style={props.style}
        data-testid={props["data-testid"]}
        hidden={props.hidden}
        title={props.title}
        aria-label={props["aria-label"]}
        type={type}
        onClick={onClick}
        ref={innerRef}
        disabled={isLoading || props.isLoading}
      >
        {(props.icon || props.label) && (
          <div className="ToolIcon__icon" aria-hidden="true">
            {props.icon || props.label}
            {props.keyBindingLabel && (
              <span className="ToolIcon__keybinding">
                {props.keyBindingLabel}
              </span>
            )}
            {props.isLoading && <Spinner />}
          </div>
        )}
        {props.showAriaLabel && (
          <div className="ToolIcon__label">
            {props["aria-label"]} {isLoading && <Spinner />}
          </div>
        )}
        {props.children}
      </button>
    );
  }
});