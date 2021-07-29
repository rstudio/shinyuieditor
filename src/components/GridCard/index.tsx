import { ComponentChildren, JSX } from "preact";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

type GridCardReqProps = {
  gridArea: string;
  children: ComponentChildren;
};

export function GridCard(
  props: GridCardReqProps & { title: string; icon?: JSX.Element }
): JSX.Element;
export function GridCard(
  props: GridCardReqProps & { header: JSX.Element }
): JSX.Element;
export function GridCard(
  props: GridCardReqProps & {
    title?: string;
    icon?: JSX.Element;
    header?: JSX.Element;
  }
) {
  return (
    <GridItem className={classes.cardWHeader} gridArea={props.gridArea}>
      {"header" in props ? (
        props.header
      ) : (
        <h3 className={classes.title}>
          {props.icon}
          {props.title}
        </h3>
      )}
      <div class={classes.body}>{props.children}</div>
    </GridItem>
  );
}
