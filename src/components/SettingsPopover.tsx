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
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";

export function SettingsPopover({
  name,
  isOpen,
  setIsOpen,
  onDelete,
  children,
}: {
  name: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete?: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <IconButton
        aria-label="Delete panel"
        size="sm"
        variant="ghost"
        icon={<TrashIcon />}
        style={{ left: 0, position: "absolute", top: 0, opacity: 0.5 }}
        onClick={onDelete}
      />
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(!isOpen)}
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
    </>
  );
}
