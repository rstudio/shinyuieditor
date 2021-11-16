import { Tooltip } from "@chakra-ui/tooltip";
import styled from "@emotion/styled";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function TooltipButton({
  popoverText,
  ...props
}: { popoverText: string } & BaseButtonProps) {
  return (
    <Tooltip label={popoverText}>
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
