import { FunctionComponent } from "preact";
import classes from "./style.module.css";

export const FakeBrowser: FunctionComponent<{}> = ({ children }) => {
  return (
    <div class={classes.fakeBrowser}>
      <div class={classes.menuBar}>
        <div class={classes.buttons}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class={classes.urlBox}>
          <span> www.myShinyApp.com </span>
        </div>
      </div>
      {children}
    </div>
  );
};
