import redo from "assets/icons/redo.png";
import tour from "assets/icons/tour.png";
import undo from "assets/icons/undo.png";

import classes from "./styles.module.css";
const icons = {
  undo,
  redo,
  tour,
};
export function PngIcon({
  id,
  alt = id,
  size,
}: {
  id: keyof typeof icons;
  alt?: string;
  size?: string;
}) {
  // if (id === "alignBottom") return <AlignBottom />;
  // if (id === "alignTop") return <AlignTop />;
  return (
    <img
      src={icons[id]}
      alt={alt}
      className={classes.icon}
      style={size ? { height: size } : {}}
    />
  );
}
