import * as React from "react";

import * as ReactDOM from "react-dom";

import { PanelHeader } from "./EditorSkeleton/EditorSkeleton";
import classes from "./PortalModal.module.css";

interface IProps {
  el?: string;
  children: React.ReactNode;
}

/**
 * React portal based on https://stackoverflow.com/a/59154364
 * @param children Child elements
 * @param el HTML element to create.  default: div
 */
const Portal: React.FC<IProps> = ({ children, el = "div" }: IProps) => {
  const [container] = React.useState(document.createElement(el));

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

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
