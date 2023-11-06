import React from "react";

import type { ServerPositions } from "communication-types/src/MessageToBackend";
import { Link45deg } from "react-bootstrap-icons";
import { getNodePosition } from "treesitter-parsers";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/PopoverEl/FloatingPopover";
import { getAllInputOutputIdsInApp } from "../../EditorContainer/getAllInputOutputIdsInApp";
import type { ParsedAppServerNodes } from "../../parsing/ParsedAppInfo";
import { useCurrentAppInfo } from "../../state/app_info";
import { useUpdateServerCode } from "../../state/useUpdateServerCode";
import type { InputComponentByType } from "../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../ui-node-definitions/inputFieldTypes";
import { mergeClasses } from "../../utils/mergeClasses";
import { useCurrentServerNodes } from "../useUpToDateServerLocations";

import { updateServerWithNewId } from "./updateServerWithNewId";

export function IdInput({
  id,
  label,
  value,
  onChange,
  inputOrOutput,
}: InputComponentByType<"id">) {
  // It's totally possible this is a terrible idea and I should be passing the
  // UI tree down instead. Right now performance seems fine though especially
  // since this is a leaf node
  const appInfo = useCurrentAppInfo();
  const updateServerCode = useUpdateServerCode();
  const serverNodes = useCurrentServerNodes();

  const [syncStatus, setSyncStatus] = React.useState<
    "synced" | "unsynced" | null
  >(null);
  const [invalidMsg, setInvalidMsg] = React.useState<null | string>(null);

  // TempValue is used to store the value of the input when it is invalid. This
  // is used to prevent the input from getting stuck in an invalid state if the
  // user deletes all the way to an empty string etc...
  const [tempValue, setTempValue] = React.useState<string | null>(null);

  // Check if the current value exists in the server locations
  const locationsOfId = getLocationsInServerOfId(value, serverNodes);

  const boundToServer = locationsOfId !== null;

  React.useEffect(() => {
    if (boundToServer) {
      setSyncStatus("synced");
    } else {
      setSyncStatus("unsynced");
    }
  }, [boundToServer]);

  if (appInfo.mode !== "MAIN") return null;

  const { ui_tree, language } = appInfo;

  const bindingIds = getAllInputOutputIdsInApp(ui_tree);

  const updateValue = (newValue: string) => {
    // Replace spaces with underscores
    newValue = newValue.replace(/ /g, "_");

    // Check if the requested new value is already in use and set invalid if it is
    const isTakenId = bindingIds.includes(newValue) && newValue !== value;
    const isEmptyId = newValue === "";

    if (isTakenId) {
      setInvalidMsg(`The id ${newValue} is already taken`);
    }

    // If the id is empty, don't send that as that's not a valid ID
    if (isEmptyId) {
      setInvalidMsg("ID cannot be empty");
    }

    if (isTakenId || isEmptyId) {
      setTempValue(newValue);
      return;
    }

    onChange(newValue);
    setInvalidMsg(null);
    setTempValue(null);

    if (syncStatus === "synced" && locationsOfId !== null) {
      updateServerCode((oldScript) => {
        const updated_script = updateServerWithNewId({
          oldId: value,
          newId: newValue,
          positions: locationsOfId,
          appScript: oldScript,
          language,
        });

        return updated_script;
      });
    }
  };

  const isInvalid = typeof tempValue === "string";

  return (
    <>
      <div className="flex items-center gap-1">
        <input
          className="SUE-Input"
          aria-label={label}
          aria-labelledby={makeLabelId(id)}
          aria-invalid={isInvalid}
          id={id}
          // If the tempValue is not null we must be in an invalid state and
          // should show that value instead of the real real one so users can
          // fix it. This prevents the input from never letting you delete all
          // the way to an empty field getting stuck writing out an id that
          // contains another id as a prefix
          value={isInvalid ? tempValue : value}
          onChange={(e) => {
            updateValue(e.target.value);
          }}
          type="text"
        />
        {boundToServer && (
          <Tooltip placement="right-start">
            <TooltipTrigger asChild>
              <div className="relative">
                <Link45deg
                  className={mergeClasses(
                    "text-xl relative ",
                    syncStatus === "synced"
                      ? ["text-rstudio-blue"]
                      : [
                          "text-danger after:block after:absolute after:w-px after:bg-danger",
                        ]
                  )}
                  onClick={() => {
                    setSyncStatus((prev) =>
                      prev === "unsynced" ? "synced" : "unsynced"
                    );
                  }}
                />
                {syncStatus === "unsynced" && (
                  <div
                    className="bg-danger/50 w-[2px] absolute left-[50%] top-1 bottom-1 pointer-events-none"
                    style={{ transform: "rotate(320deg)" }}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="my-1">
                {syncStatus === "synced"
                  ? "Changing ID will cause uses of this ID in server code to update."
                  : "ID syncing is disabled. Changes to this ID will not be reflected in server code."}
              </p>
              <p className="my-1">
                Click to {syncStatus === "synced" ? "disable" : "enable"}{" "}
                syncing.
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {invalidMsg && (
        <div className="text-danger">
          <small>{invalidMsg}</small>
        </div>
      )}
    </>
  );
}

function getLocationsInServerOfId(
  id: string,
  serverLocations: ParsedAppServerNodes | null
): ServerPositions | null {
  if (serverLocations === null) return null;

  const { inputNodes, outputNodes } = serverLocations;

  if (inputNodes.has(id)) {
    return inputNodes.get(id)!.map(getNodePosition);
  }

  if (outputNodes.has(id)) {
    return outputNodes.get(id)!.map(getNodePosition);
  }

  return null;
}
