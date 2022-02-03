import * as React from "react";
import * as ReactDOM from "react-dom";
import classes from "./Portal.module.css";

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
    container.classList.add(classes.portalHolder);

    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

const PortalModal: React.FC = ({ children }) => {
  return (
    <Portal>
      <div className={classes.portalModal}>{children}</div>
    </Portal>
  );
};

export default PortalModal;
