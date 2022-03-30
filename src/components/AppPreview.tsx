import React from "react";

import { AiOutlineExpand, AiOutlineShrink } from "react-icons/ai";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview({ url }: { url: string }) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <div
      className={
        classes.container +
        " " +
        (isFullScreen ? classes.fullScreen : classes.previewMode)
      }
    >
      <Button
        variant="icon"
        className={classes.expandButton}
        onClick={() =>
          setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen)
        }
      >
        {isFullScreen ? <AiOutlineShrink /> : <AiOutlineExpand />}
      </Button>
      <iframe
        className={classes.previewFrame}
        src={url}
        title="Application Preview"
      />
    </div>
  );
}
