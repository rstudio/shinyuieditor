// import alignBottom from "assets/icons/alignItemBottom.png";
import alignBottom from "assets/icons/alignItemBottom.svg";
import alignHCenter from "assets/icons/alignItemHCenter.svg";
import alignHSpread from "assets/icons/alignItemHSpread.svg";
import alignLeft from "assets/icons/alignItemLeft.svg";
import alignRight from "assets/icons/alignItemRight.svg";
import alignTop from "assets/icons/alignItemTop.svg";
import alignVCenter from "assets/icons/alignItemVCenter.svg";
import alignVSpread from "assets/icons/alignItemVSpread.svg";

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
};

function Icon({ id, alt = id }: { id: keyof typeof icons; alt?: string }) {
  return <img src={icons[id]} alt={alt} className={classes.icon} />;
}

export default Icon;
