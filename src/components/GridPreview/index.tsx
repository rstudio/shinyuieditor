import type { GridLayoutTemplate } from "../../types";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";

import classes from "./style.module.css";

export function GridPreview(props: {
  layout: GridLayoutTemplate;
  isCurrent?: boolean;
  displaySize: number;
  onClick: () => void;
}) {
  const {
    displaySize = 200,
    isCurrent,
    layout: { name, rows, cols, gap, items = [] },
    onClick,
  } = props;
  const scale = 1000 / displaySize;

  // Dont calc with relative units ()
  const scaleUnit = (unit: string) =>
    unit.includes("fr") || unit.includes("auto")
      ? unit
      : `calc(${unit}/ ${scale})`;

  return (
    <div
      className={classes.wrapper + (isCurrent ? " " + classes.current : "")}
      style={{
        "--shown-size": `${displaySize}px`,
        "--corner-radius": `${20 / scale}px`,
      }}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <GridContainer
        className={classes.grid}
        cols={cols.map(scaleUnit)}
        rows={rows.map(scaleUnit)}
        gap={`calc(${gap} / ${scale})`}
      >
        {items.map((def) => (
          <GridItem className={classes.item} key={def.name} {...def} />
        ))}
      </GridContainer>
    </div>
  );
}
