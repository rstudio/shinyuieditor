import * as React from "react";

import * as ReactDOM from "react-dom";

/**
 * React portal based on https://stackoverflow.com/a/59154364
 * @param children Child elements
 * @param el HTML element to create.  default: div
 */
export const Portal: React.FC<{
  el?: string;
  children: React.ReactNode;
}> = ({ children, el = "div" }) => {
  const [container] = React.useState(document.createElement(el));

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
