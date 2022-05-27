import React from "react";

import type { Story } from "@ladle/react";

import type { GridLayoutDef } from ".";

export const EditableGridContainerShowcase: Story<{
  layout: GridLayoutDef;
}> = (layout) => {
  return (
    <div style={containerStyles}>
      <div style={{ outline: "1px solid forestgreen", height: "100%" }}>
        <h1>Hi there!</h1>
      </div>
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  outline: "1px solid red",
  width: "900px",
  height: "700px",
  padding: "20px",
};

EditableGridContainerShowcase.args = {
  layout: {
    areas: [
      ["a", "b"],
      ["c", "d"],
    ],
    rowSizes: ["100px", "1fr"],
    colSizes: ["200px", "1fr"],
    gapSize: "15px",
  },
};
