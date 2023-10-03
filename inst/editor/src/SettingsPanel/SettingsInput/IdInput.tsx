import React from "react";

import { Link45deg } from "react-bootstrap-icons";

import { getAllBindingIds } from "../../EditorContainer/getAllBindingIds";
import { useCurrentAppInfo } from "../../state/app_info";
import type { InputComponentByType } from "../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../ui-node-definitions/inputFieldTypes";
import { useUpToDateServerLocations } from "../useUpToDateServerLocations";

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
  const serverLocations = useUpToDateServerLocations();

  const [currValue, setCurrValue] = React.useState(value);
  const [invalidMsg, setInvalidMsg] = React.useState<null | string>(null);

  if (appInfo.mode !== "MAIN") return null;

  // Check if the current value exists in the server locations
  const boundToServer =
    serverLocations?.input_positions[value] !== undefined ||
    serverLocations?.output_positions[value] !== undefined;

  const app_tree = appInfo.ui_tree;

  const bindingIds = getAllBindingIds(app_tree);

  const updateValue = (newValue: string) => {
    // Check if the requested new value is already in use and set invalid if it is
    const takenId = bindingIds.includes(newValue) && newValue !== value;

    // Replace spaces with underscores
    newValue = newValue.replace(/ /g, "_");

    setCurrValue(newValue);

    if (takenId) {
      setInvalidMsg(`The id ${newValue} is already taken`);
    } else {
      onChange(newValue);
      setInvalidMsg(null);
    }
  };

  const isInvalid = invalidMsg !== null;

  const common_props = {
    className: "SUE-Input",
    "aria-label": label,
    "aria-labelledby": makeLabelId(id),
    "aria-invalid": isInvalid,
    id,
    value: currValue,
    onChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      updateValue(e.target.value);
    },
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <input {...common_props} type="text" />
        {boundToServer && <Link45deg className="text-xl text-rstudio-blue" />}
      </div>
      {invalidMsg && (
        <div className="text-danger">
          <small>{invalidMsg}</small>
        </div>
      )}
    </>
  );
}
