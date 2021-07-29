import { FunctionComponent, JSX } from "preact";
import { GridLayoutDef } from "../../types";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const TheAppGridContainer: FunctionComponent<{
  defs: GridLayoutDef;
  styles?: JSX.CSSProperties;
}> = ({ defs, children, styles: extraStyles }) => {
  const { cols = [], rows = [], gap } = defs;

  const rowTractLines = rows.map((r, i) => (
    <GridItem
      cols={[1, -1]}
      rows={[i + 1, i + 1]}
      className={classes.rowTractBoundary}
    />
  ));
  const colTractLines = cols.map((c, i) => (
    <GridItem
      rows={[1, -1]}
      cols={[i + 1, i + 1]}
      className={classes.colTractBoundary}
    />
  ));

  return (
    <GridContainer defs={defs} styles={{ ...extraStyles, "--gap": gap }}>
      {children}
      {rowTractLines}
      {colTractLines}
    </GridContainer>
  );
};
