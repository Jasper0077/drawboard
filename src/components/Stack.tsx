import clsx from "clsx";
import React from "react";
import "./Stack.scss";

export interface StackProps {
  children: React.ReactNode;
  gap?: number;
  align?: "start" | "center" | "end" | "baseline";
  justifyContent?: "center" | "space-around" | "space-between";
  className?: string | boolean;
  style?: React.CSSProperties;
  ref: React.RefObject<HTMLDivElement>;
}

const RowStack = React.forwardRef(
  (
    { children, gap, align, justifyContent, className, style }: StackProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={clsx("Stack Stack_horizontal", className)}
        style={{
          gap,
          alignItems: align,
          justifyContent,
          ...style
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const ColStack = React.forwardRef(
  (
    { children, gap, align, justifyContent, className, style }: StackProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={clsx("Stack Stack_vertical", className)}
        style={{
          gap,
          justifyItems: align,
          justifyContent,
          ...style
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default {
  Row: RowStack,
  Col: ColStack
};
