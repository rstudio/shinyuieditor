import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyTextOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyTextOutput: UiNodeComponent<
  ShinyTextOutputProps,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
  return (
    <div className={classes.container} {...wrapperProps}>
      Dynamic text from <code>output${namedArgs.outputId}</code>
    </div>
  );
};
export default ShinyTextOutput;
