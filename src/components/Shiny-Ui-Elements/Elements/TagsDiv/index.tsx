import classes from "./styles.module.css";

type TagsDivArguments = {
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
};

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};

const TagsDiv: (p: TagsDivArguments) => JSX.Element = ({
  horizontalAlign,
  verticalAlign,
}) => {
  const styles = {
    "--verticalAlign": dirToFlexProp[verticalAlign],
    "--horizontalAlign": dirToFlexProp[horizontalAlign],
  } as React.CSSProperties;
  return (
    <div className={classes.container} style={styles}>
      <div>Horizontal Align: {horizontalAlign}</div>
      <div>Vertical Align: {verticalAlign}</div>
    </div>
  );
};

export default TagsDiv;
