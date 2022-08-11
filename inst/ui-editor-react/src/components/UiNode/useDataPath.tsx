import React from "react";

import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

/**
 * Add a data attribute to each node's outer div so it can be easily selected
 * via path. Attribute added is `data-sue-path` and is joined by dashes (`-`)
 */
export function useDataPath({
  ref,
  path,
}: {
  ref: React.RefObject<HTMLDivElement>;
  path: NodePath;
}) {
  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.dataset.suePath = path.join("-");
  }, [ref, path]);
}
