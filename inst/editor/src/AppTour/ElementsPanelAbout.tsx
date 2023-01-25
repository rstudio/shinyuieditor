import * as React from "react";

import "../DragAndDropHelpers/DragAndDrop.css";

export const ElementsPanelAbout = (
  <div>
    Drag elements from the elements palette into the app pane on the right to
    add them to your app. <br></br> In the app view, the areas available for the
    element to be dropped in will pulse with an{" "}
    <span className="can-accept-drop" style={{ padding: "2px" }}>
      orange outline.
    </span>
  </div>
);
