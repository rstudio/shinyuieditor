import React from "react";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview({ url }: { url: string }) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <div
      className={
        classes.container + (isFullScreen ? " " + classes.fullScreen : "")
      }
    >
      <Button
        className={classes.expandButton}
        onClick={() =>
          setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen)
        }
      >
        {isFullScreen ? "Shrink" : "Expand"}
      </Button>
      <iframe
        className={classes.previewFrame}
        src={url}
        title="Application Preview"
      />
    </div>
  );
}
