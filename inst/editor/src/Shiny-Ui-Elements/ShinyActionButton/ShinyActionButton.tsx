import Button from "../../components/Inputs/Button/Button";
import type { UiLeafNodeComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from "./index";

import classes from "./styles.module.css";

const ShinyActionButton: UiLeafNodeComponent<ShinyActionButtonProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const { label = "My Action Button", width } = uiArguments;

  return (
    <div className={classes.container} {...wrapperProps}>
      <Button style={width ? { width } : undefined}>{label}</Button>
    </div>
  );
};
export default ShinyActionButton;
