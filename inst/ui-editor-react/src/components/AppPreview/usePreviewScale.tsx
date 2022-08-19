import React from "react";

import { PROPERTIES_PANEL_WIDTH_PX } from "EditorContainer";
import debounce from "just-debounce-it";

import {
  PREVIEW_INSET_HORIZONTAL_PX,
  EXPANDED_INSET_HORIZONTAL_PX,
} from "./index";

export function usePreviewScale() {
  const pageSize = useGetPageSize();
  return getPreviewScale(pageSize.width);
}

function useGetPageSize() {
  const [pageSize, setPageSize] = React.useState<{
    width: number;
    height: number;
  }>(getPageSize());

  // Debounce the callback to window size updating so we're not slowing app down
  // keeping up with resize
  const updateWindowSize = React.useMemo(
    () =>
      debounce(() => {
        setPageSize(getPageSize());
      }, 500),
    []
  );

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  return pageSize;
}

function getPreviewScale(page_width_px: number) {
  const width_of_preview_app =
    PROPERTIES_PANEL_WIDTH_PX - PREVIEW_INSET_HORIZONTAL_PX * 2;

  const width_of_expanded_app =
    page_width_px - EXPANDED_INSET_HORIZONTAL_PX * 2;

  return width_of_preview_app / width_of_expanded_app;
}

function getPageSize() {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
}
