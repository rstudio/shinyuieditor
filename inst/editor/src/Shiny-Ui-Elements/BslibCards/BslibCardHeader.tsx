import { CardHeader } from "../../components/cards/CardHeader";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

export type CardHeaderSettings = {
  title: string;
};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = ({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  return <CardHeader {...wrapperProps}>{uiArguments.title}</CardHeader>;
};

export const bslibCardHeaderInfo: UiComponentInfo<CardHeaderSettings> = {
  title: "Card Header",
  UiComponent: BslibCardHeader,
  settingsInfo: {
    title: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "NODE NAME",
    },
  },
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};
