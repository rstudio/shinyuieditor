import { IconButton } from "@chakra-ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import * as React from "react";
import { FiSettings as SettingsIcon } from "react-icons/fi";

export function SettingsPopover({
  name,
  isOpen,
  onClose,
  onOpen,
  children,
}: {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Open settings dialog"
          icon={<SettingsIcon />}
          style={{ right: 0, position: "absolute", top: 0, opacity: 0.5 }}
        />
      </PopoverTrigger>
      <PopoverContent aria-label={`Settings for ${name}`}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <code>{name}</code> settings
        </PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
