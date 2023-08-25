import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode } from "../ShinyUiNode";

type CardBodyFillSettings = {
  gap?: CSSMeasure;
  max_height?: CSSMeasure;
  min_height?: CSSMeasure;
};

type CardBodyFillNode = MakeShinyUiNode<CardBodyFillSettings>;

export const card_body = nodeInfoFactory<CardBodyFillSettings>()({
  id: "card_body",
  r_info: {
    fn_name: "card_body",
    package: "bslib",
    fn_aliases: [
      {
        fn_name: "card_body_fill",
      },
    ],
  },
  title: "Card Body",
  takesChildren: true,
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
