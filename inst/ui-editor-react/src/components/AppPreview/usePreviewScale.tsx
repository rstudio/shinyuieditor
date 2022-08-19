import React from "react";

import { PROPERTIES_PANEL_WIDTH_PX } from "EditorContainer";
import debounce from "just-debounce-it";

import {
  PREVIEW_INSET_HORIZONTAL_PX,
  EXPANDED_INSET_HORIZONTAL_PX,
} from "./index";

export function usePreviewScale() {
  const [previewScale, setPreviewScale] = React.useState<number>(
    getPreviewScale(window.innerWidth)
  );

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

export function useGetPageSize() {
  const [pageSize, setPageSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  // Debounce the callback to window size updating so we're not slowing app down
  // keeping up with resize
  const updateWindowSize = React.useMemo(
    () =>
      debounce(() => {
        const { innerWidth, innerHeight } = window;
        setPageSize({
          width: innerWidth,
          height: innerHeight,
        });
      }, 500),
    []
  );

  React.useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  return pageSize;
}
