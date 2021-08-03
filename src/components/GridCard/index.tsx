import type { ComponentChildren, JSX } from "preact";
import type { CSSMeasure } from "../../types";
import { GridItem } from "../GridItem";
import type { IconName } from "../Icons";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

type GridCardCommonProps = {
  gridArea: string;
  children: ComponentChildren;
  padding?: CSSMeasure;
};

export function GridCard(
  props: GridCardCommonProps & { title: string; icon?: IconName }
): JSX.Element;
export function GridCard(
  props: GridCardCommonProps & { header: JSX.Element }
): JSX.Element;
export function GridCard(
  props: GridCardCommonProps & {
    title?: string;
    icon?: IconName;
    header?: JSX.Element;
  }
) {
  const { padding = "0.5rem", gridArea } = props;
  return (
    <GridItem className={classes.cardWHeader} gridArea={gridArea}>
      {"header" in props ? (
        props.header
      ) : (
        <h3 className={classes.title} style={{ padding }}>
          <SvgIcon name={props.icon} />
          {props.title}
        </h3>
      )}
      <div style={{ padding }}>{props.children}</div>
    </GridItem>
  );
}
