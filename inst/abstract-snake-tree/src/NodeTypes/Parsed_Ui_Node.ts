import type { Expand_Single } from "util-functions/src/TypescriptUtils";

type Node_Fields_By_Type = {
  /**
   * Call node representing a function call. E.g. `foo(bar, baz)`
   */
  call: {
    fn_name: string;
    args: Parsed_Ui_Node[];
  };
  string: {
    value: string;
  };
  number: {
    value: number;
  };
  boolean: {
    value: boolean;
  };
  /**
   * Unknown node for when a node is not recognised by our list of parsing
   * filters. Just dumps the text to the text field and calls it a day.
   */
  unknown: {
    text: string;
  };
};

export type Parsed_Nodes_By_Type = {
  [K in keyof Node_Fields_By_Type]: {
    type: K;
    /**
     * A node will have a name property attached if it represents a keyword
     * argument pair in the ui tree. E.g. `foo = bar`. Extracts the name and
     * value of the keyword argument.
     */
    name?: string;
  } & Node_Fields_By_Type[K];
};

export type Parsed_Ui_Node = Expand_Single<
  Parsed_Nodes_By_Type[keyof Node_Fields_By_Type]
>;
