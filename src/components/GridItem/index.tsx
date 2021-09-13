import { FunctionComponent, Ref } from "preact";
import { addGridPosToStyles } from "../../helper-scripts/grid-helpers";

export const GridItem: FunctionComponent<{
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
  gridArea?: string;
  className?: string;
  styles?: JSX.CSSProperties;
  divRef?: Ref<HTMLDivElement | undefined>;
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
      ref={divRef as Ref<HTMLDivElement>}
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
