import type { Parsed_Ui_Node } from "./Parsed_Ui_Node";

/**
 * A node representing a simple value in the ui tree. E.g. not a function call
 * or keyword argument pair
 */
export interface Parsed_Value_Node extends Parsed_Ui_Node {
  type: "value";
  value_type: string;
  value: unknown;
}
