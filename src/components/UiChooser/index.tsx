import classes from "./style.module.css";

const availableComponents = ["Plot", "Slider", "Drop-Down"];

export const UiChooser = () => {
  return (
    <div className={classes.uiChooser}>
      <h3>Choose your UI component!</h3>
      <div className={classes.componentList}>
        {availableComponents.map((comp) => (
          <div key={comp} className={classes.componentEntry}>
            <span>{comp}</span>
            <div className={classes.uiScreenshot}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
