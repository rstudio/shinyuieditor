import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type {
  MakeShinyUiNode,
  UiComponentInfo,
  UiNodeComponent,
} from "../uiNodeTypes";

import { CardBody } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

export type CardBodySettings = {
  max_height?: CSSMeasure;
  min_height?: CSSMeasure;
};

type CardBodyFillNode = MakeShinyUiNode<CardBodySettings>;

const BslibCardBody: UiNodeComponent<
  CardBodySettings,
  { TakesChildren: true }
> = ({ uiArguments, uiChildren = [], path, wrapperProps }) => {
  return (
    <CardBody {...wrapperProps}>
      <CardChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        parentUiName="bslib::card_body_fill"
      />
    </CardBody>
  );
};

export const bslibCardBodyInfo: UiComponentInfo<CardBodySettings> = {
  title: "Card Body",
  UiComponent: BslibCardBody,
  settingsInfo: {
    max_height: {
      label: "Max allowed height",
      inputType: "cssMeasure",
      optional: true,
      defaultValue: (node) => {
        if (!node) return "500px";

        return (node as CardBodyFillNode).uiArguments.min_height ?? "500px";
      },
      units: ["px", "%"],
    },
    min_height: {
      label: "Min allowed height",
      inputType: "cssMeasure",
      optional: true,
      defaultValue: (node) => {
        if (!node) return "100px";

        return (node as CardBodyFillNode).uiArguments.max_height ?? "100px";
      },
      units: ["px", "%"],
    },
  },
  acceptsChildren: true,
  category: "Cards",
  description: "body holder for bslib cards",
};
