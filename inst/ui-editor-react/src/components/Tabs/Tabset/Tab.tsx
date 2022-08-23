import React from "react";

import classes from "./Tabset.module.css";

export const Tab = ({
  name,
  isActive,
  onSelect,
}: {
  name: string;
  isActive: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      className={classes.tab}
      data-active-tab={isActive}
      onClick={() => onSelect()}
    >
      {name}
    </div>
  );
};
