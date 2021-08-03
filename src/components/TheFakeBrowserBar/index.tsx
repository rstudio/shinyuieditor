import { FunctionComponent } from "preact";
import classes from "./style.module.css";

export const TheFakeBrowserBar = () => {
  return (
    <div className={classes.menuBar}>
      <div className={classes.buttons}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.urlBox}>
        <span> www.myShinyApp.com </span>
      </div>
    </div>
  );
};

export const FakeBrowser: FunctionComponent = ({ children }) => {
  return (
    <div className={classes.fakeBrowser}>
      <TheFakeBrowserBar />
      {children}
    </div>
  );
};
