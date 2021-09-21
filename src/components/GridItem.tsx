/** @jsxImportSource @emotion/react */
import * as React from "react";

import { addGridPosToStyles } from "../grid-helpers";

export const GridItem: React.FC<{
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
  gridArea?: string;
  className?: string;
  styles?: React.CSSProperties;
  divRef?: React.Ref<HTMLDivElement | undefined>;
}> = ({
  startRow,
  endRow,
  startCol,
  endCol,
  gridArea,
  className,
  styles: extraStyles,
  children,
  divRef,
}) => {
  return (
    <div
      ref={divRef as React.Ref<HTMLDivElement>}
      className={className}
      style={addGridPosToStyles(
        {
          startRow,
          endRow,
          startCol,
          endCol,
          gridArea,
        },
        extraStyles
      )}
    >
      {children}
    </div>
  );
};
