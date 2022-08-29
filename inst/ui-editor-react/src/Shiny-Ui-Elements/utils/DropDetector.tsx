import React from "react";

import type { DropHandlerArguments } from "DragAndDropHelpers/useDropHandlers";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

function DropDetector({
  children,
  className,
  ...opts
}: DropHandlerArguments & {
  className?: string;
  children?: React.ReactElement;
}) {
  const detectorRef = React.useRef<HTMLDivElement>(null);

  useDropHandlers(detectorRef, opts);

  return (
    <div
      ref={detectorRef}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </div>
  );
}

export default DropDetector;
