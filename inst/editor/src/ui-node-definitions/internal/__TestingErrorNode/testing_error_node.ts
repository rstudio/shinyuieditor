import { nodeInfoFactory } from "../../nodeInfoFactory";

// Provides a node that throws an error when a button is clicked in editor or
// settings panel (for testing error boundaries)
export const testing_error_node = nodeInfoFactory<{
  error_msg: string;
}>()({
  r_info: {
    fn_name: "error_node",
    package: "TESTING",
  },
  id: "error_node",
  title: "Error Throwing Node",
  takesChildren: false,
  settingsInfo: {
    error_msg: {
      label: "Message for error",
      inputType: "string",
      defaultValue: "Uh oh, an error!",
    },
  },
  category: "TESTING",
  description:
    "Node that throws an error when a button is clicked in editor or settings panel",
});
