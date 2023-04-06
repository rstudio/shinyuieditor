import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, UiNodeComponent } from "../uiNodeTypes";

import { CardBodyFill } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

export type CardBodyFillSettings = {
  gap?: CSSMeasure;
  max_height?: CSSMeasure;
  min_height?: CSSMeasure;
};

type CardBodyFillNode = MakeShinyUiNode<CardBodyFillSettings>;

const BslibCardBody: UiNodeComponent<
  CardBodyFillSettings,
  { TakesChildren: true }
> = ({ namedArgs, children = [], path, wrapperProps }) => {
  return (
    <CardBodyFill {...wrapperProps} args={namedArgs}>
      <CardChildrenWithDropNodes
        children={children}
        path={path}
        parentid="bslib::card_body_fill"
        messageOnHover="Add to card body"
      />
    </CardBodyFill>
  );
};

export const bslibCardBodyInfo = nodeInfoFactory<CardBodyFillSettings>()({
  library: "bslib",
  name: "card_body_fill",
  title: "Card Body",
  takesChildren: true,
  UiComponent: BslibCardBody,
  settingsInfo: {
    gap: {
      label: "Gap between items",
      inputType: "cssMeasure",
      optional: true,
      defaultValue: "10px",
      units: ["px", "rem"],
    },
    max_height: {
      label: "Max allowed height",
      inputType: "cssMeasure",
      optional: true,
      defaultValue: (node) => {
        if (!node) return "500px";

        return (node as CardBodyFillNode).namedArgs.min_height ?? "500px";
      },
      units: ["px", "%"],
    },
    min_height: {
      label: "Min allowed height",
      inputType: "cssMeasure",
      optional: true,
      defaultValue: (node) => {
        if (!node) return "100px";

        return (node as CardBodyFillNode).namedArgs.max_height ?? "100px";
      },
      units: ["px", "%"],
    },
  },
  category: "Cards",
  description: "body holder for bslib cards",
});
