import { Placement } from "@popperjs/core";
import React from "react";
import { usePopper } from "react-popper";
import classes from "./PopoverButton.module.css";

export const PopoverButton: React.FC<
  {
    popoverText: string;
    placement?: Placement;
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, placement = "right", popoverText, ...passthroughProps }) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
  });

  function showPopper() {
    popperElement?.setAttribute("data-show", "");
  }
  function hidePopper() {
    popperElement?.removeAttribute("data-show");
  }

  return (
    <>
      <button
        {...passthroughProps}
        ref={setReferenceElement}
        onMouseEnter={() => showPopper()}
        onMouseLeave={() => hidePopper()}
      >
        {children}
      </button>
      <div
        ref={setPopperElement}
        className={classes.popover}
        style={styles.popper}
        {...attributes.popper}
      >
        {popoverText}
      </div>
    </>
  );
};
