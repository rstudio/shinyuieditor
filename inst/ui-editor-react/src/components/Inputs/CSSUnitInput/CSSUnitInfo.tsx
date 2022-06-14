import React from "react";

import { Info } from "components/Icons";
import { PopoverButton } from "components/Inputs/PopoverButton";

import type { CSSUnits } from "./index";

import classes from "./CSSUnitInfo.module.css";

export const CSSUnitInfo = ({ units }: { units: CSSUnits[] }) => {
  return (
    <PopoverButton
      className={classes.infoIcon}
      popoverContent={<UnitInfoText units={units} />}
      showOn="click"
      placement="auto"
    >
      <Info />
    </PopoverButton>
  );
};

function UnitInfoText({ units }: { units: CSSUnits[] }) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>CSS size options</div>
      <div className={classes.info}>
        {units.map((unit) => (
          <React.Fragment key={unit}>
            <div className={classes.unit}>{unit}</div>
            <div className={classes.description}>{unitDescriptions[unit]}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const unitDescriptions: Record<CSSUnits, string> = {
  "%": "Relative to percentage of container size",
  auto: "Let the content decide size",
  fr: "Relative unit. E.g. 2fr is twice the size of 1fr",
  px: "Screen pixels",
  rem: "Pixel size of app font. Typically 16 pixels.",
};
