import { CardFooter } from "../../components/cards/CardFooter";
import type { UiComponentInfo } from "../uiNodeTypes";

export const bslibCardFooterInfo: UiComponentInfo<CardFooterSettings> = {
  title: "Card Header",
  UiComponent: ({ uiArguments, uiChildren = [], path, wrapperProps }) => {
    return <CardFooter {...wrapperProps}>{uiArguments.title}</CardFooter>;
  },
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

export type CardFooterSettings = {
  title: string;
};
