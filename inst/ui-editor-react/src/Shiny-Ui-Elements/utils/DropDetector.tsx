import React from "react";

import type { DropHandlerArguments } from "DragAndDropHelpers/useDropHandlers";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

function DropDetector(opts: DropHandlerArguments) {
  const detectorRef = React.useRef<HTMLDivElement>(null);

  useDropHandlers(detectorRef, opts);

  return (
    <div ref={detectorRef} style={{ height: "100%", width: "100%" }}></div>
  );
}

export default DropDetector;
