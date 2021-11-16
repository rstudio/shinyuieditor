import { Tooltip } from "@chakra-ui/tooltip";
import styled from "@emotion/styled";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type TooltipProps = React.ComponentProps<typeof Tooltip>;

export function TooltipButton({
  popoverText,
  popoverPlacement,
  ...props
}: {
  popoverText: string;
  popoverPlacement?: TooltipProps["placement"];
} & BaseButtonProps) {
  if (typeof popoverPlacement === "undefined") popoverPlacement = "top";
  return (
    <Tooltip
      label={popoverText}
      placement={popoverPlacement}
      border="1px solid var(--light-grey)"
      backgroundColor="var(--rstudio-white)"
      color="var(--rstudio-grey)"
    >
      <SquareButtonBase {...props}></SquareButtonBase>
    </Tooltip>
  );
}

const SquareButtonBase = styled.button({
  width: "var(--gap, 100px)",
  height: "var(--gap, 100px)",
  display: "grid",
  placeContent: "center",
  color: "var(--rstudio-blue, pink)",
  "&.disabled": {
    cursor: "help",
    color: "var(--light-grey, pink)",
  },
});
