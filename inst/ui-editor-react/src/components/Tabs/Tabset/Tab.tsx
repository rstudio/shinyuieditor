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
  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onSelect();
  };
  return (
    <div
      className={classes.tab}
      data-active-tab={isActive}
      onClick={handleSelect}
      aria-label={isActive ? `Active tab ${name}` : `Select ${name} tab`}
    >
      {name}
    </div>
  );
};
