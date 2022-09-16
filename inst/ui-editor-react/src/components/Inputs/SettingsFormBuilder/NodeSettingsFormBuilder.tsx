import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type {
  ArgumentInfo,
  SettingsInfo,
  SettingsObjFromInfo,
} from "./ArgumentInfo";
import type { ArgumentsOrCallbacks } from "./infoValueGetters";
import { getValueFromProperty } from "./infoValueGetters";
import type { InputComponentsOutput } from "./SettingsFormBuilder";
import { SettingsFormBuilder } from "./SettingsFormBuilder";
import type { SettingsUpdateAction } from "./SettingsInput/SettingsInput";

type NonDynamicProps = "type" | "optional";
type DynamicArgumentInfo = ArgumentsOrCallbacks<ArgumentInfo, NonDynamicProps>;

type MakeDynamicArgumentInfo<ArgInfo extends ArgumentInfo> =
  ArgumentsOrCallbacks<ArgInfo, NonDynamicProps>;

type ToDynamicSettingsInfo<Info extends SettingsInfo> = {
  [ArgName in keyof Info]: MakeDynamicArgumentInfo<Info[ArgName]>;
};

export type DynamicSettingsInfo = Record<string, DynamicArgumentInfo>;

function convertDynamicValues<ArgInfo extends ArgumentInfo>(
  dynamicInfo: ArgumentsOrCallbacks<ArgInfo, NonDynamicProps>,
  node: ShinyUiNode
): ArgumentInfo {
  const unpackedInfo: Record<string, any> = {};

  for (const key in dynamicInfo) {
    unpackedInfo[key] = getValueFromProperty(
      dynamicInfo[key as keyof DynamicArgumentInfo],
      node
    );
  }

  return unpackedInfo as ArgInfo;
}

function convertDynamicSettingsInfo<Info extends SettingsInfo>(
  dynamicSettingsInfo: ToDynamicSettingsInfo<Info>,
  node: ShinyUiNode
): Info {
  const convertedInfo: Record<string, any> = {};

  for (const argName in dynamicSettingsInfo) {
    convertedInfo[argName] = convertDynamicValues(
      dynamicSettingsInfo[argName],
      node
    );
  }

  return convertedInfo as Info;
}

// type NodeSettingsFormBuilderProps<Info extends SettingsInfo> = ;

export function NodeSettingsFormBuilder<Info extends SettingsInfo>({
  node,
  settingsInfo,
  renderInputs,
  onSettingsChange,
}: {
  node: ShinyUiNode;
  settingsInfo: ToDynamicSettingsInfo<Info>;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
}) {
  const staticSettingsInfo = convertDynamicSettingsInfo(settingsInfo, node);
  const settings = node.uiArguments as SettingsObjFromInfo<
    typeof staticSettingsInfo
  >;

  return (
    <SettingsFormBuilder
      settings={settings}
      settingsInfo={staticSettingsInfo}
      renderInputs={renderInputs}
      onSettingsChange={onSettingsChange}
    />
  );
}
