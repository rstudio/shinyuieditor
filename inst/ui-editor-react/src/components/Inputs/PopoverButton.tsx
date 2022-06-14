import React from "react";

import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

import classes from "./PopoverButton.module.css";

type PopoverButtonProps = {
  placement?: Placement;
  popoverContent: string | JSX.Element;
  showOn?: "hover" | "click";
  bgColor?: string;
  openDelayMs?: number;
};

export const PopoverButton: React.FC<
  PopoverButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({
  children,
  placement = "right",
  showOn = "hover",
  popoverContent,
  bgColor,
  openDelayMs = 0,
  ...passthroughProps
}) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 5] } },
      ],
      strategy: "fixed",
    }
  );

  // Add extra background color variable if it's requested
  const popperStyles = React.useMemo(() => {
    const extraStyles = {
      "--popover-bg-color": bgColor,
      "--popover-open-delay": `${openDelayMs}ms`,
    } as React.CSSProperties;

    return { ...styles.popper, ...extraStyles };
  }, [bgColor, openDelayMs, styles.popper]);

  const eventListeners = React.useMemo(() => {
    function showPopper() {
      update?.();
      popperElement?.setAttribute("data-show", "");
    }
    function hidePopper() {
      popperElement?.removeAttribute("data-show");
    }

    const showTrigger = showOn === "hover" ? "onMouseEnter" : "onClick";

    return {
      [showTrigger]: () => showPopper(),
      onMouseLeave: () => hidePopper(),
    };
  }, [popperElement, showOn, update]);

  const textContent = typeof popoverContent === "string";
  return (
    <>
      <button
        {...passthroughProps}
        {...eventListeners}
        ref={setReferenceElement}
      >
        {children}
      </button>
      <div
        ref={setPopperElement}
        className={classes.popover}
        style={popperStyles}
        {...attributes.popper}
      >
        {textContent ? (
          <div className={classes.textContent}>{popoverContent}</div>
        ) : (
          popoverContent
        )}
        <div
          ref={setArrowElement}
          className={classes.popperArrow}
          style={styles.arrow}
        />
      </div>
    </>
  );
};
