import * as React from "react";
import * as ReactDOM from "react-dom";
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

const PortalModal: React.FC<{
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ children, title, onConfirm, onCancel }) => {
  return (
    <Portal>
      <div
        className={classes.portalHolder}
        // Clicking outside the modal will trigger the onCancel event
        onClick={() => onCancel()}
      >
        <div
          className={classes.portalModal}
          // Dont let the clicking on the modal itself trigger canceling
          onClick={(e) => e.stopPropagation()}
        >
          {title ? <div className={classes.title}>{title}</div> : null}
          <div className={classes.body}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default PortalModal;
