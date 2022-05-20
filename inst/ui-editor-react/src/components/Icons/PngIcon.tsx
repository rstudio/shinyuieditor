import alignCenter from "assets/icons/alignItem.png";
import alignBottom from "assets/icons/alignItemBottom.png";
import alignTop from "assets/icons/alignItemTop.png";
import alignSpread from "assets/icons/alignTextCenter.png";
import alignTextCenter from "assets/icons/alignTextCenter.png";
import alignTextLeft from "assets/icons/alignTextLeft.png";
import alignTextRight from "assets/icons/alignTextRight.png";
import redo from "assets/icons/redo.png";
import tour from "assets/icons/tour.png";
import undo from "assets/icons/undo.png";

import classes from "./styles.module.css";
const icons = {
  undo,
  redo,
  tour,
  alignTop,
  alignBottom,
  alignCenter,
  alignSpread,
  alignTextCenter,
  alignTextLeft,
  alignTextRight,
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
