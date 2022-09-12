import React from "react";

import { PopoverButton } from "components/Inputs/PopoverButton";
import { FaPlus } from "react-icons/fa";

const ButtonStyle: React.CSSProperties = {
  display: "block",
};

export default function PlusButton({
  label,
  onClick,
  className,
}: {
  className?: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <PopoverButton
      className={className}
      placement="bottom"
      aria-label={label}
      popoverContent={label}
      onClick={onClick}
      openDelayMs={0}
    >
      <FaPlus style={ButtonStyle} />
    </PopoverButton>
  );
}
