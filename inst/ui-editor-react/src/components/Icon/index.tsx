// import alignBottom from "assets/icons/alignItemBottom.png";
// import alignBottom from "assets/icons/alignItemBottom.svg";
import alignBottom, {
  ReactComponent as AlignBottom,
} from "assets/icons/alignItemBottom.svg";
import alignHCenter, {
  ReactComponent as AlignHCenter,
} from "assets/icons/alignItemHCenter.svg";
import alignHSpread, {
  ReactComponent as AlignHSpread,
} from "assets/icons/alignItemHSpread.svg";
import alignLeft, {
  ReactComponent as AlignLeft,
} from "assets/icons/alignItemLeft.svg";
import alignRight, {
  ReactComponent as AlignRight,
} from "assets/icons/alignItemRight.svg";
// import alignTop from "assets/icons/alignItemTop.svg";
import alignTop, {
  ReactComponent as AlignTop,
} from "assets/icons/alignItemTop.svg";
import alignVCenter, {
  ReactComponent as AlignVCenter,
} from "assets/icons/alignItemVCenter.svg";
import alignVSpread, {
  ReactComponent as AlignVSpread,
} from "assets/icons/alignItemVSpread.svg";
import redo from "assets/icons/redo.png";
import tour from "assets/icons/tour.png";
import undo from "assets/icons/undo.png";

import classes from "./styles.module.css";

const icons = {
  alignLeft,
  alignVCenter,
  alignVSpread,
  alignRight,
  alignTop,
  alignHCenter,
  alignHSpread,
  alignBottom,

  undo,
  redo,
  tour,
};

export {
  AlignBottom,
  AlignTop,
  AlignHCenter,
  AlignHSpread,
  AlignLeft,
  AlignRight,
  AlignVCenter,
  AlignVSpread,
};

function Icon({
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

export default Icon;
