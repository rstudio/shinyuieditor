import React from "react";

import PlusButton from "../../Inputs/PlusButton";

import classes from "./Tabset.module.css";

export function AddTabButton({ onNewTab }: { onNewTab: () => void }) {
  return (
    <PlusButton
      className={classes.addTabButton}
      label="Add new tab"
      onClick={onNewTab}
    />
  );
}
