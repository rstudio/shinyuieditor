import React from "react";

import type { Placement } from "@popperjs/core";
import ReactMarkdown from "react-markdown";
import { usePopper } from "react-popper";

import classes from "./styles.module.css";

export type PopoverProps = {
  placement?: Placement;
  popoverContent: string | JSX.Element;
  contentIsMd?: boolean;
  showOn?: "hover" | "click";
  bgColor?: string;
  openDelayMs?: number;
  triggerEl: React.ReactElement;
};

/**
 * Add a popover to a provided trigger element
 */
export const PopoverEl = ({
  placement = "right",
  showOn = "hover",
  popoverContent,
  contentIsMd = false,
  bgColor,
  openDelayMs = 0,
  triggerEl,
}: PopoverProps) => {
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
        { name: "offset", options: { offset: [0, 10] } },
      ],
      strategy: "fixed",
    }
  );

  // Add extra background color variable if it's requested
  const popperStyles = React.useMemo(() => {
    return { ...styles.popper, backgroundColor: bgColor };
  }, [bgColor, styles.popper]);

  const eventListeners = React.useMemo(() => {
    let delayedShowTimeout: ReturnType<typeof setTimeout>;
    function showPopper() {
      delayedShowTimeout = setTimeout(() => {
        update?.();
        popperElement?.setAttribute("data-show", "");
      }, openDelayMs);
    }
    function hidePopper() {
      // Make sure we cancel a timeout in case it has yet to display
      clearTimeout(delayedShowTimeout);
      popperElement?.removeAttribute("data-show");
    }

    const showTrigger = showOn === "hover" ? "onMouseEnter" : "onClick";

    return {
      [showTrigger]: () => showPopper(),
      onMouseLeave: () => hidePopper(),
      // Some popover items are interactable with and in this case we don't want
      // the popover to stay up if the user has decided to interact with it
      onPointerDown: () => hidePopper(),
    };
  }, [openDelayMs, popperElement, showOn, update]);

  const content =
    typeof popoverContent !== "string" ? (
      popoverContent
    ) : contentIsMd ? (
      <ReactMarkdown className={classes.popoverMarkdown}>
        {popoverContent}
      </ReactMarkdown>
    ) : (
      <div className={classes.textContent}>{popoverContent}</div>
    );

  return (
    <>
      {React.cloneElement(triggerEl, {
        ...eventListeners,
        ref: setReferenceElement,
      })}
      <div
        ref={setPopperElement}
        className={classes.popover}
        style={popperStyles}
        {...attributes.popper}
      >
        {content}
        <div
          ref={setArrowElement}
          className={classes.popperArrow}
          style={styles.arrow}
        />
      </div>
    </>
  );
};
