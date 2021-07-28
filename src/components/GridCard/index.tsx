import { ComponentChildren, JSX } from "preact";
import classes from "./style.module.css";

export const GridCard = (props: {
  gridArea: string;
  children: ComponentChildren;
  title?: string;
  icon?: JSX.Element;
  header?: JSX.Element;
}) => (
  <div
    className={classes.cardWHeader}
    style={{ "--grid-area": props.gridArea }}
  >
    {"header" in props ? (
      props.header
    ) : (
      <h3 className={classes.title}>
        {props.icon}
        {props.title}
      </h3>
    )}
    <div class={classes.body}>{props.children}</div>
  </div>
);
