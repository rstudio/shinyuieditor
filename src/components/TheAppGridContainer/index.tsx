import { FunctionComponent, JSX } from "preact";
import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";
import { TheFakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const TheAppGridContainer: FunctionComponent<{
  layout: GridLayoutTemplate;
  styles?: JSX.CSSProperties;
}> = ({ layout, styles: extraStyles, children }) => {
  const { cols = [], rows = [], gap } = layout;

  // We need to make one less tract line that there are tracts because the
  // controls only go between and there are N-1 spots between N elements
  const rowTractLines = Array.from({ length: rows.length - 1 }, (_, i) => (
    <GridItem
      cols={[1, -1]}
      rows={[i + 1, i + 1]}
      className={classes.rowTractBoundary}
    />
  ));
  const colTractLines = Array.from({ length: cols.length - 1 }, (_, i) => (
    <GridItem
      rows={[1, -1]}
      cols={[i + 1, i + 1]}
      className={classes.colTractBoundary}
    />
  ));

  return (
    <GridCard gridArea="editor" header={<TheFakeBrowserBar />} padding={"0px"}>
      <GridContainer defs={layout} styles={{ ...extraStyles, "--gap": gap }}>
        {rowTractLines}
        {colTractLines}
        {children}
      </GridContainer>
    </GridCard>
  );
};

export const my_component = () => {
  return <div></div>;
};
