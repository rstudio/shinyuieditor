import type React from "react";

export const PROPERTIES_PANEL_WIDTH_PX = 236;
const ELEMENTS_PALETTE_WIDTH_PX = 174;
const HEADER_HEIGHT_PX = 31;

export const sizes_inline_styles = {
  "--elements-palette-width": `${ELEMENTS_PALETTE_WIDTH_PX}px`,
  "--header-height": `${HEADER_HEIGHT_PX}px`,
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;
