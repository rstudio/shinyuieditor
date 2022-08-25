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
    console.log("Clicked on a tab!");
    e.stopPropagation();
    onSelect();
  };
  return (
    <div
      className={classes.tab}
      data-active-tab={isActive}
      // Note the use of onClickCapture here. This is needed to prevent the
      // native click listener from hearing the click event because normally the
      // click event is propagated all the way to the root before react starts
      // handling it
      onClickCapture={handleSelect}
    >
      {name}
    </div>
  );
};
