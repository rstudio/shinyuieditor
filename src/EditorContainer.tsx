import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import GridApp from "components/Shiny-Ui-Elements/Layouts/GridApp";
import * as React from "react";
import { useQuery } from "react-query";
import classes from "./EditorContainer.module.css";
import { getInitialState } from "./getInitialState";
export function EditorContainer() {
  const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  }

  return (
    <div className={classes.container}>
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
      </div>
      <div className={classes.sidebar}>
        <h3>Objects</h3>
        <ElementsPalette />
      </div>
      <div className={classes.editorHolder}>
        <GridApp layout={data.layout.options} panels={data.elements} />
      </div>
    </div>
  );
}
