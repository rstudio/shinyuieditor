import React from "react";

import type { DropHandlerArguments } from "DragAndDropHelpers/useDropHandlers";
import { useDropHandlers } from "DragAndDropHelpers/useDropHandlers";

type DropDetectorProps = {
  dropArgs: DropHandlerArguments;
} & React.ComponentPropsWithoutRef<"div">;

function DropDetector({
  children,
  dropArgs,
  style,
  ...divProps
}: DropDetectorProps) {
  const detectorRef = React.useRef<HTMLDivElement>(null);

  useDropHandlers(detectorRef, dropArgs);

  const detectorStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    ...style,
  };

  return (
    <div ref={detectorRef} style={detectorStyles}>
      {children}
    </div>
  );
}

export default DropDetector;
