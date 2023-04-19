import * as React from "react";

export const InputOutputTitle = ({
  type,
  name,
  className,
}: {
  type: "input" | "output";
  name: string;
  className?: string;
}) => {
  return (
    <code className={className}>
      <span style={{ opacity: 0.55 }}>{type}$</span>
      <span>{name}</span>
    </code>
  );
};
