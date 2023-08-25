import { nodeInfoFactory } from "../nodeInfoFactory";

export const card_header = nodeInfoFactory<{}>()({
  r_info: {
    fn_name: "card_header",
    package: "bslib",
  },
  id: "card_header",
  title: "Card Header",
  takesChildren: true,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
});
