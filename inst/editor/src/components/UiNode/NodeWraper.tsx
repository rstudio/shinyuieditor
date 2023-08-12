import { mergeClasses } from "../../utils/mergeClasses";

import type { UiNodeWrapperProps } from "./useMakeWrapperProps";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function NodeWrapper({
  wrapperProps,
  className,
  ...divProps
}: { wrapperProps: UiNodeWrapperProps } & DivProps) {
  const isSelected = wrapperProps["data-is-selected-node"];
  return (
    <div
      className={mergeClasses(
        className,
        `w-full relative`,
        isSelected && "z-50"
      )}
      {...divProps}
      {...wrapperProps}
    />
  );
}
