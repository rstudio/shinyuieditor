import { FunctionComponent } from "preact";
import classes from "./style.module.css";

export const GridCard: FunctionComponent<{
  title?: string;
  icon?: JSX.Element;
  gridArea: string;
}> = ({ title, icon, gridArea, children }) => {
  return (
    <div
      className={title ? classes.cardWTitle : classes.cardNoTitle}
      style={{ "--grid-area": gridArea }}
    >
      {title ? (
        <h3 className={classes.title}>
          {icon}
          {title}
        </h3>
      ) : null}
      <div class={classes.body}>{children}</div>
    </div>
  );
};
