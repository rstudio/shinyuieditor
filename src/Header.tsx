import * as React from "react";
import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import classes from "./Header.module.css";

export function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.leftSide}>
        <h1 className={classes.title}>Shiny Visual Editor</h1>
        <img src={rstudioLogo} alt="RStudio Logo" />
        <img
          src={shinyLogo}
          css={{ backgroundColor: "var(--rstudio-blue, pink)" }}
          alt="Shiny Logo"
        />
      </div>
      {/* <HistoryNav /> */}
    </div>
  );
}
