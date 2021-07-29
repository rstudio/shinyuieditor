import { FunctionComponent, JSX } from "preact";
import { GridLayoutDef } from "../../types";
import { GridContainer } from "../GridContainer";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const TheAppGridContainer: FunctionComponent<{
  defs: GridLayoutDef;
  className?: string;
  styles?: JSX.CSSProperties;
}> = ({ defs, children, className, styles: extraStyles }) => {
  const { cols, rows, gap } = defs;

  let gridCells: Array<JSX.Element>;

  return (
    <GridContainer defs={defs} styles={extraStyles}>
      {children}
    </GridContainer>
  );
};
