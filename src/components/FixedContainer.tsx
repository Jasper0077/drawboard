import "./FixedContainer.scss";

import React from "react";
import clsx from "clsx";

type FixedContainerProps = {
  children: React.ReactNode;
  side: "top" | "left" | "right";
  className?: string;
};

export const FixedContainer = ({
  children,
  side,
  className
}: FixedContainerProps) => (
  <div
    className={clsx("FixedContainer", `FixedContainer_side_${side}`, className)}
  >
    {children}
  </div>
);
