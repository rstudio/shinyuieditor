import { ComponentChildren, JSX } from "preact";
import { CSSMeasure } from "../../types";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

type GridCardCommonProps = {
  gridArea: string;
  children: ComponentChildren;
  padding?: CSSMeasure;
};

export function GridCard(
  props: GridCardCommonProps & { title: string; icon?: JSX.Element }
): JSX.Element;
export function GridCard(
  props: GridCardCommonProps & { header: JSX.Element }
): JSX.Element;
export function GridCard(
  props: GridCardCommonProps & {
    title?: string;
    icon?: JSX.Element;
    header?: JSX.Element;
  }
) {
  const { padding = "0.5rem" } = props;
  return (
    <GridItem className={classes.cardWHeader} gridArea={props.gridArea}>
      {"header" in props ? (
        props.header
      ) : (
        <h3 className={classes.title} style={{ padding }}>
          {props.icon}
          {props.title}
        </h3>
      )}
      <div style={{ padding }}>{props.children}</div>
    </GridItem>
  );
}
