import React from "react";

import { X } from "react-bootstrap-icons";

import { Trash } from "../components/Icons";
import Button from "../components/Inputs/Button/Button";
import { Tooltip } from "../components/PopoverEl/FloatingPopover";
import { TooltipTrigger } from "../components/PopoverEl/FloatingPopover";
import { TooltipContent } from "../components/PopoverEl/FloatingPopover";
import { useCurrentAppInfo } from "../state/app_info";
import { mergeClasses } from "../utils/mergeClasses";

import type { ServerBindingInfo } from "./useGetNodeServerBindingInfo";

function useCurrentAppScript(): string | null {
  const appInfo = useCurrentAppInfo();

  if (appInfo.mode !== "MAIN") return null;

  const { app_script } = appInfo;

  return app_script;
}

export function NodeDeleteButton({
  serverBindingInfo,
  onDelete,
}: {
  serverBindingInfo: ServerBindingInfo | null;
  onDelete: () => void;
}) {
  const appScript = useCurrentAppScript();
  const [showDeleteWarning, setShowDeleteWarning] = React.useState(false);

  const deletingWillDeleteServerCode =
    serverBindingInfo &&
    serverBindingInfo.inputOrOutput === "output" &&
    serverBindingInfo.nodes;

  React.useEffect(() => {
    // Reset the delete warning when the server binding info changes
    setShowDeleteWarning(false);
  }, [serverBindingInfo]);

  const deleteServerCode = () => {
    if (!(appScript && serverBindingInfo && serverBindingInfo.nodes)) return;
    const { nodes } = serverBindingInfo;

    // Grab current app script]
    console.log("Trying to delete from here");
  };

  return (
    <Tooltip
      open={showDeleteWarning}
      // By letting the tooltip have this control we can make sure that the
      // user can close the tooltip by clicking outside of it
      onOpenChange={() => setShowDeleteWarning(false)}
      placement="left"
    >
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            if (deletingWillDeleteServerCode) {
              setShowDeleteWarning(true);
            } else {
              onDelete();
            }
          }}
          variant="delete"
          className={mergeClasses("border-0 w-100 text-danger ", {
            "opacity-50": showDeleteWarning,
            "cursor-not-allowed": showDeleteWarning,
          })}
        >
          <Trash className="text-2xl" />
          Delete Element
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={mergeClasses("border-0 w-72 p-3", {
          hidden: !deletingWillDeleteServerCode,
        })}
      >
        <Button
          className="absolute right-0 top-0 border-0 text-lg"
          onClick={() => {
            setShowDeleteWarning(false);
          }}
          aria-label="Cancel"
          title="Cancel Delete"
          variant="icon"
        >
          <X />
        </Button>
        <h2 className="text-danger text-base mb-2">Warning!</h2>
        <p className="mb-4">
          This element has server code that renders it. How do you want to
          handle deletion?
        </p>
        <div className="border  p-3 relative rounded-md flex flex-col gap-1 w-full">
          <span className="absolute text-danger left-1 -top-3 bg-white px-1">
            Delete
          </span>
          <Button
            onClick={() => {
              onDelete();
              deleteServerCode();
              setShowDeleteWarning(false);
            }}
            variant="delete"
            className="border-2 text-danger w-full"
            title="Delete both element and bound server code"
          >
            Element & Server Code
          </Button>
          <Button
            onClick={() => {
              onDelete();
              setShowDeleteWarning(false);
            }}
            variant="delete"
            className="border-2  text-danger w-full"
            title="Delete element but keep server code"
          >
            Element Only
          </Button>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
