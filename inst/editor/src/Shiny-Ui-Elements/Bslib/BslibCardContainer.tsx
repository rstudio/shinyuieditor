import React from "react";

import type { bslib_card } from "ui-node-definitions/src/Bslib/card";

import { PopoverButton } from "../../components/Inputs/PopoverButton";
import { Portal } from "../../components/PortalModal/Portal";
import { sizes_inline_styles } from "../../EditorContainer/App_Layout_Sizes";
import { mergeClasses } from "../../utils/mergeClasses";
import type { ArgsFromInfo } from "../utils/add_editor_info_to_ui_node";

import styles from "./BslibCard.module.css";

type BslibCardArguments = ArgsFromInfo<typeof bslib_card>;
export const BslibCardContainer = React.forwardRef(
  (
    {
      children,
      style,
      card_args: { full_screen = false },
      ...props
    }: React.ComponentPropsWithoutRef<"div"> & {
      card_args: BslibCardArguments;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const toggle_full_screen = () => setIsFullScreen((isFull) => !isFull);

    const contents = (
      <div
        style={sizes_inline_styles}
        className={mergeClasses(
          "card",
          styles.container,
          isFullScreen ? styles.full_screen_mode : null
        )}
      >
        {full_screen ? (
          <FullScreenButton
            isFullScreen={isFullScreen}
            onClick={toggle_full_screen}
          />
        ) : null}
        {children}
      </div>
    );

    if (isFullScreen) {
      return <Portal>{contents}</Portal>;
    }
    return (
      <div ref={ref} style={style} className={styles.card_holder} {...props}>
        {contents}
      </div>
    );
  }
);

function FullScreenButton({
  isFullScreen,
  onClick,
}: {
  isFullScreen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={styles.full_screen_button_container}
      data-is-full-screen={isFullScreen}
    >
      <PopoverButton
        popoverContent={
          isFullScreen ? "Reset full screen" : "Expand to full screen"
        }
        placement="left"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        variant={isFullScreen ? "regular" : "icon"}
      >
        {isFullScreen ? (
          "Close"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
            ></path>
          </svg>
        )}
      </PopoverButton>
    </div>
  );
}
