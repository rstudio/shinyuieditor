import React from "react";

import type { DropHandlerArguments } from "../../DragAndDropHelpers/useDropHandlers";
import { useDropHandlers } from "../../DragAndDropHelpers/useDropHandlers";

type DropDetectorProps = {
  dropArgs: DropHandlerArguments;
} & React.ComponentPropsWithoutRef<"div">;

function DropDetector({ children, dropArgs, ...divProps }: DropDetectorProps) {
  const detectorRef = useDropHandlers(dropArgs);

  return (
    <div ref={detectorRef} {...divProps}>
      {children}
    </div>
  );
}

export default DropDetector;
