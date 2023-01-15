import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import type { Primative_Array, Primative_Map } from "./flatten_list";
import { flatten_array, get_node_is_array } from "./flatten_list";
import { get_node_is_list } from "./flatten_list";
import { flatten_list } from "./flatten_list";
import {
  is_ast_branch_node,
  is_named_node,
  is_ast_leaf_node,
  is_ui_assignment_node,
} from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";

export type Primatives = string | number | boolean;

type Script_Position = [
  start_row: number,
  start_col: number,
  end_row: number,
  end_col: number
];

type Node_Vals_By_Key = {
  s: string; // Symbol
  c: string; // Characters/ strings
  b: boolean;
  n: number;
  u: unknown;
  m: never; // missing
  e: R_AST; // another node/expression
};

type AST_Node_By_Key = {
  [key in keyof Node_Vals_By_Key]: {
    val: Node_Vals_By_Key[key];
    type: key;
    name?: string;
    pos?: Script_Position;
  };
};

export type Branch_Node = AST_Node_By_Key["e"];
export type Leaf_Node = AST_Node_By_Key["c" | "b" | "n"];
export type Unparsable_Node = AST_Node_By_Key["s" | "m" | "u"];
export type R_AST_Node = AST_Node_By_Key[keyof Node_Vals_By_Key];

export type R_AST = Array<R_AST_Node>;

export type Fn_Call_AST = [fn_name: string, ...fn_args: R_AST_Node[]];

type Shiny_Ui_Argument_Val =
  | Primatives
  | Primative_Array
  | Primative_Map
  | ShinyUiNodeByName["unknownUiFunction"];

type Shiny_Ui_AST = {
  ui_name: string;
  ui_arguments: Record<string, Shiny_Ui_Argument_Val>;
  ui_children: Shiny_Ui_AST[];
};

export function get_ui_assignment_node(ast: R_AST): Branch_Node {
  for (const index in ast) {
    const subnode = ast[index];
    if (is_ui_assignment_node(subnode) && is_ast_branch_node(subnode.val[2])) {
      return subnode.val[2];
    }
  }

  throw new Parsing_Error({
    message: "No ui assignment node was found in provided ast",
  });
}

function flatten_node({ val }: Branch_Node): Shiny_Ui_AST {
  const [fn_name, ...args] = val;

  const ui_name = fn_name.val;
  if (typeof ui_name !== "string") {
    throw new Parsing_Error({
      message: "Invalid ui node, name is not a primative",
    });
  }

  let ui_arguments: Shiny_Ui_AST["ui_arguments"] = {};
  let ui_children: Shiny_Ui_AST["ui_children"] = [];

  args.forEach((sub_node) => {
    if (is_named_node(sub_node)) {
      ui_arguments[sub_node.name] = process_named_arg(sub_node);
    } else {
      ui_children.push(process_unnamed_arg(sub_node));
    }
  });

  return { ui_name, ui_arguments, ui_children };
}

function process_named_arg(node: R_AST_Node): Shiny_Ui_Argument_Val {
  if (is_ast_leaf_node(node)) {
    return node.val;
  }

  if (get_node_is_array(node)) {
    return flatten_array(node);
  }

  if (get_node_is_list(node)) {
    return flatten_list(node);
  }

  return create_unknownUiFunction({ node });
}

function process_unnamed_arg(node: R_AST_Node): Shiny_Ui_AST {
  if (!is_ast_branch_node(node)) {
    throw new Parsing_Error({
      message: "Primative found in ui children of ui node.",
    });
  }

  return flatten_node(node);
}

// const sample_ast = `[{"val":[{"val":"library"},{"val":"plotly"}],"pos":[1,1,1,15]},{"val":[{"val":"library"},{"val":"shiny"}],"pos":[2,1,2,14]},{"val":[{"val":"library"},{"val":"gridlayout"}],"pos":[3,1,3,19]},{"val":[{"val":"library"},{"val":"DT"}],"pos":[4,1,4,11]},{"val":[{"val":"<-"},{"val":"ui"},{"val":[{"val":"grid_page"},{"name":"layout","val":[{"val":"c"},{"val":"header  header  "},{"val":"sidebar area4   "},{"val":"table   bluePlot"},{"val":"table   bluePlot"}]},{"name":"row_sizes","val":[{"val":"c"},{"val":"125px"},{"val":"1fr"},{"val":"1fr"},{"val":"1fr"}]},{"name":"col_sizes","val":[{"val":"c"},{"val":"735px"},{"val":"1fr"}]},{"name":"gap_size","val":"1rem"},{"val":[{"val":"grid_card"},{"name":"area","val":"sidebar"},{"name":"item_alignment","val":"top"},{"name":"title","val":"Settings"},{"name":"item_gap","val":"12px"},{"val":[{"val":"sliderInput"},{"name":"inputId","val":"bins"},{"name":"label","val":"Number of Bins"},{"name":"min","val":12},{"name":"max","val":100},{"name":"value","val":30},{"name":"animate","val":[{"val":"animationOptions"},{"name":"interval","val":1000},{"name":"loop","val":false},{"name":"playButton","val":"play"},{"name":"pauseButton","val":"pause"}]},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_text"},{"name":"area","val":"header"},{"name":"content","val":"Single File App"},{"name":"alignment","val":"start"},{"name":"is_title","val":false}]},{"val":[{"val":"grid_card"},{"name":"area","val":"table"},{"name":"item_alignment","val":"center"},{"name":"title","val":"Table"},{"name":"scrollable","val":true},{"name":"item_gap","val":"12px"},{"val":[{"val":"DTOutput"},{"name":"outputId","val":"myTable"},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_plot"},{"name":"area","val":"bluePlot"}]},{"val":[{"val":"grid_card"},{"name":"area","val":"area4"},{"val":[{"val":"plotlyOutput"},{"name":"outputId","val":"distPlot"},{"name":"width","val":"100%"},{"name":"height","val":"100%"}]}]}]}],"pos":[8,1,72,1]},{"val":[{"val":"<-"},{"val":"other_ui"},{"val":"hello there"}],"pos":[75,1,75,25]},{"val":[{"val":"<-"},{"val":"server"},{"val":[{"val":"function"},{"val":[{"name":"input","val":""},{"name":"output","val":""}]},{"val":[{"val":"{","pos":[78,35,78,35]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"distPlot"}]},{"val":[{"val":"renderPlotly"},{"val":[{"val":"{","pos":[80,35,80,35]},{"val":[{"val":"plot_ly"},{"name":"x","val":[{"val":"~"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}]},{"name":"type","val":"histogram"}],"pos":[82,5,82,51]}]}]}],"pos":[80,3,86,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"bluePlot"}]},{"val":[{"val":"renderPlot"},{"val":[{"val":"{","pos":[88,33,88,33]},{"val":[{"val":"<-"},{"val":"x"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}],"pos":[90,5,90,25]},{"val":[{"val":"<-"},{"val":"bins"},{"val":[{"val":"seq"},{"val":[{"val":"min"},{"val":"x"}]},{"val":[{"val":"max"},{"val":"x"}]},{"name":"length.out","val":[{"val":"+"},{"val":[{"val":"$"},{"val":"input"},{"val":"bins"}]},{"val":1}]}]}],"pos":[91,5,91,60]},{"val":[{"val":"hist"},{"val":"x"},{"name":"breaks","val":"bins"},{"name":"col","val":"steelblue"},{"name":"border","val":"white"}],"pos":[94,5,94,63]}]}]}],"pos":[88,3,95,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"myTable"}]},{"val":[{"val":"renderDT"},{"val":[{"val":"{","pos":[99,5,99,5]},{"val":[{"val":"head"},{"val":"faithful"},{"val":10}],"pos":[100,7,100,24]}]}]}],"pos":[98,3,102,3]}]}]}],"pos":[78,1,103,1]},{"val":[{"val":"shinyApp"},{"val":"ui"},{"val":"server"}],"pos":[105,1,105,20]}]`;

// const parsed_ast: R_AST = JSON.parse(sample_ast);
// const ui_node = get_ui_assignment_node(parsed_ast);

// const flattened = flatten_node(ui_node);

// const sliderTest = flattened["ui_children"][0]["ui_children"];
// const parsed_sue_ast = raw_ast_to_sue_ast(ui_node);

// Find a given assignment at any depth in the tree

// function get_ui_from_ast(parsed_ast: object) {}
