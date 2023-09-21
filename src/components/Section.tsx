import React from "react";

export const Section: React.FC<{
  heading: "shapes" | "canvasActions" | "selectedShapeActions";
  children?: React.ReactNode | ((heading: React.ReactNode) => React.ReactNode);
  className?: string;
}> = ({ heading, children, ...props }) => {
  const header = (
    <h2 className="visually-hidden" id={`drawboard-title`}>
      heading
    </h2>
  );
  return (
    <section {...props} aria-labelledby={`drawboard-section`}>
      {typeof children === "function" ? (
        children(header)
      ) : (
        <>
          {header}
          {children}
        </>
      )}
    </section>
  );
};
