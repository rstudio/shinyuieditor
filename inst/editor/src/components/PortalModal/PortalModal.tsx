import * as React from "react";

import { PanelHeader } from "../../EditorLayout/PanelHeader";

import { Portal } from "./Portal";
import classes from "./PortalModal.module.css";

function PortalModal({
  children,
  title,
  label,
  onConfirm,
  onCancel,
}: {
  title?: string;
  label?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Portal>
      <div
        className={classes.portalHolder}
        // Clicking outside the modal will trigger the onCancel event
        onClick={() => onCancel()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onCancel();
          }
        }}
      >
        <div
          className={classes.portalModal}
          // Dont let the clicking on the modal itself trigger canceling
          onClick={(e) => e.stopPropagation()}
          aria-label={label ?? "popup modal"}
        >
          {title ? (
            <PanelHeader className={classes.title}>{title}</PanelHeader>
          ) : null}
          <div className={classes.body}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}

export default PortalModal;
