import Button from "../../components/Inputs/Button/Button";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from "./index";

import classes from "./styles.module.css";

const ShinyActionButton: UiNodeComponent<
  ShinyActionButtonProps,
  { TakesChildren: false }
> = ({ uiArguments, wrapperProps }) => {
  const { label = "My Action Button", width } = uiArguments;

  return (
    <div className={classes.container} {...wrapperProps}>
      <Button style={width ? { width } : undefined}>{label}</Button>
    </div>
  );
};
export default ShinyActionButton;
