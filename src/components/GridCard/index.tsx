import { FunctionComponent } from "preact";
import classes from "./style.module.css";

export const GridCard: FunctionComponent<{
  title: string;
  gridArea: string;
}> = ({ title, gridArea, children }) => {
  return (
    <div className={classes.card} style={{ "--grid-area": gridArea }}>
      <h3 className={classes.title}>{title}</h3>
      <div class={classes.body}>{children}</div>
    </div>
  );
};
