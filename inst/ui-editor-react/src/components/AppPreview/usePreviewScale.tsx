import React from "react";

import { PROPERTIES_PANEL_WIDTH_PX } from "EditorContainer";

import {
  useGetPageSize,
  PREVIEW_INSET_HORIZONTAL_PX,
  EXPANDED_INSET_HORIZONTAL_PX,
} from "./index";

export function usePreviewScale() {
  const [previewScale, setPreviewScale] = React.useState(0.2);

  const pageSize = useGetPageSize();
  React.useEffect(() => {
    if (!pageSize) return;
    setPreviewScale(getPreviewScale(pageSize.width));
  }, [pageSize]);

  return previewScale;
}

function getPreviewScale(page_width_px: number) {
  const width_of_preview_app =
    PROPERTIES_PANEL_WIDTH_PX - PREVIEW_INSET_HORIZONTAL_PX * 2;

  const width_of_expanded_app =
    page_width_px - EXPANDED_INSET_HORIZONTAL_PX * 2;

  return width_of_preview_app / width_of_expanded_app;
}
