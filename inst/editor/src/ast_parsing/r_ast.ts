import { ShinyUiNode } from "../main";
type Primatives = string | number | boolean;

type AST_Node_Generic<T extends any> = {
  val: T;
  name?: string;
  pos?: [number, number, number, number];
};
type Branch_Node = AST_Node_Generic<R_AST>;
type Leaf_Node = AST_Node_Generic<Primatives>;

type Assignment_Node = AST_Node_Generic<
  [AST_Node_Generic<"<-">, AST_Node_Generic<string>, Branch_Node]
>;

export type R_AST_Node = Branch_Node | Leaf_Node;

export type R_AST = Array<R_AST_Node>;

function is_object(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

function is_primative(x: unknown): x is Primatives {
  return (
    typeof x === "string" || typeof x === "number" || typeof x === "boolean"
  );
}
function is_ast_leaf_node(node: unknown): node is Leaf_Node {
  return (
    is_object(node) &&
    "val" in node &&
    ["string", "boolean", "number"].includes(typeof node.val)
  );
}

function is_ui_assignment_node(node: R_AST_Node): node is Assignment_Node {
  if (is_ast_leaf_node(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  return is_assignment && val[1].val === "ui";
}

function get_ui_assignment_node(ast: R_AST): R_AST {
  for (const index in ast) {
    const subnode = ast[index];
    if (is_ui_assignment_node(subnode)) {
      return subnode.val[2].val;
    }
  }

  throw new Error("No ui assignment node was found in provided ast");
}

// function is_ast_raw_val(x: unknown): x is AST_RAW_VAL {
//   const is_atomic =
//     typeof x === "string" || typeof x === "number" || typeof x === "boolean";
//   if (is_atomic) return true;

//   if (Array.isArray(x)) {
//     return x.every(is_ast_raw_val);
//   }

//   return false;
// }

// type AST_ROOT_NODE = {
//   [index: number | string]: AST_NODE;
// };

// type ASSIGNMENT_NODE = {
//   1: "<-";
//   2: string;
//   3: AST_NODE;
// };

// type Parsed_SUE_Node = {
//   ui_name: string;
//   ui_arguments: Record<string, AST_LEAF_NODE | Parsed_SUE_Node>;
//   ui_children: (AST_LEAF_NODE | Parsed_SUE_Node)[];
// };

// function is_parsed_sue_node(node: unknown): node is Parsed_SUE_Node {
//   if (typeof node !== "object" || node === null) {
//     return false;
//   }

//   return "ui_name" in node && "ui_arguments" in node;
// }

// function raw_ast_to_sue_ast(ui_node: AST_NODE): Parsed_SUE_Node {
//   if (is_ast_leaf_node(ui_node)) {
//     throw new Error("Can't to convert leaf node to SUE ast node");
//   }

//   if (is_ast_leaf_node(ui_node)) {
//     throw new Error("Can't to convert leaf node to SUE ast node");
//   }

//   const ui_arguments: Parsed_SUE_Node["ui_arguments"] = {};
//   const unnamed_parameters: Parsed_SUE_Node["ui_children"] = [];
//   for (const key in ui_node) {
//     const raw_value = ui_node[key];
//     const value =
//       is_ast_leaf_node(raw_value) || Array.isArray(raw_value)
//         ? raw_value
//         : raw_ast_to_sue_ast(raw_value);

//     const is_valid_node_type =
//       is_ast_leaf_node(value) || is_parsed_sue_node(value);
//     if (!is_valid_node_type) {
//       throw new Error("Invalid ui node type");
//     }

//     const is_named_parameter = isNaN(parseInt(key));

//     if (is_named_parameter) {
//       ui_arguments[key] = value;
//     } else {
//       unnamed_parameters.push(value);
//     }
//   }

//   const [ui_name, ...ui_children] = unnamed_parameters;

//   if (typeof ui_name !== "string") {
//     throw new Error("Tried to parse a non ui node as a ui node...");
//   }
//   return {
//     ui_name,
//     ui_arguments,
//     ui_children,
//   };
// }

const sample_ast = `[{"val":[{"val":"library"},{"val":"plotly"}],"pos":[1,1,1,15]},{"val":[{"val":"library"},{"val":"shiny"}],"pos":[2,1,2,14]},{"val":[{"val":"library"},{"val":"gridlayout"}],"pos":[3,1,3,19]},{"val":[{"val":"library"},{"val":"DT"}],"pos":[4,1,4,11]},{"val":[{"val":"<-"},{"val":"ui"},{"val":[{"val":"grid_page"},{"name":"layout","val":[{"val":"c"},{"val":"header  header  "},{"val":"sidebar area4   "},{"val":"table   bluePlot"},{"val":"table   bluePlot"}]},{"name":"row_sizes","val":[{"val":"c"},{"val":"125px"},{"val":"1fr"},{"val":"1fr"},{"val":"1fr"}]},{"name":"col_sizes","val":[{"val":"c"},{"val":"735px"},{"val":"1fr"}]},{"name":"gap_size","val":"1rem"},{"val":[{"val":"grid_card"},{"name":"area","val":"sidebar"},{"name":"item_alignment","val":"top"},{"name":"title","val":"Settings"},{"name":"item_gap","val":"12px"},{"val":[{"val":"sliderInput"},{"name":"inputId","val":"bins"},{"name":"label","val":"Number of Bins"},{"name":"min","val":12},{"name":"max","val":100},{"name":"value","val":30},{"name":"animate","val":[{"val":"animationOptions"},{"name":"interval","val":1000},{"name":"loop","val":false},{"name":"playButton","val":"play"},{"name":"pauseButton","val":"pause"}]},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_text"},{"name":"area","val":"header"},{"name":"content","val":"Single File App"},{"name":"alignment","val":"start"},{"name":"is_title","val":false}]},{"val":[{"val":"grid_card"},{"name":"area","val":"table"},{"name":"item_alignment","val":"center"},{"name":"title","val":"Table"},{"name":"scrollable","val":true},{"name":"item_gap","val":"12px"},{"val":[{"val":"DTOutput"},{"name":"outputId","val":"myTable"},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_plot"},{"name":"area","val":"bluePlot"}]},{"val":[{"val":"grid_card"},{"name":"area","val":"area4"},{"val":[{"val":"plotlyOutput"},{"name":"outputId","val":"distPlot"},{"name":"width","val":"100%"},{"name":"height","val":"100%"}]}]}]}],"pos":[8,1,72,1]},{"val":[{"val":"<-"},{"val":"other_ui"},{"val":"hello there"}],"pos":[75,1,75,25]},{"val":[{"val":"<-"},{"val":"server"},{"val":[{"val":"function"},{"val":[{"name":"input","val":""},{"name":"output","val":""}]},{"val":[{"val":"{","pos":[78,35,78,35]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"distPlot"}]},{"val":[{"val":"renderPlotly"},{"val":[{"val":"{","pos":[80,35,80,35]},{"val":[{"val":"plot_ly"},{"name":"x","val":[{"val":"~"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}]},{"name":"type","val":"histogram"}],"pos":[82,5,82,51]}]}]}],"pos":[80,3,86,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"bluePlot"}]},{"val":[{"val":"renderPlot"},{"val":[{"val":"{","pos":[88,33,88,33]},{"val":[{"val":"<-"},{"val":"x"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}],"pos":[90,5,90,25]},{"val":[{"val":"<-"},{"val":"bins"},{"val":[{"val":"seq"},{"val":[{"val":"min"},{"val":"x"}]},{"val":[{"val":"max"},{"val":"x"}]},{"name":"length.out","val":[{"val":"+"},{"val":[{"val":"$"},{"val":"input"},{"val":"bins"}]},{"val":1}]}]}],"pos":[91,5,91,60]},{"val":[{"val":"hist"},{"val":"x"},{"name":"breaks","val":"bins"},{"name":"col","val":"steelblue"},{"name":"border","val":"white"}],"pos":[94,5,94,63]}]}]}],"pos":[88,3,95,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"myTable"}]},{"val":[{"val":"renderDT"},{"val":[{"val":"{","pos":[99,5,99,5]},{"val":[{"val":"head"},{"val":"faithful"},{"val":10}],"pos":[100,7,100,24]}]}]}],"pos":[98,3,102,3]}]}]}],"pos":[78,1,103,1]},{"val":[{"val":"shinyApp"},{"val":"ui"},{"val":"server"}],"pos":[105,1,105,20]}]`;

const parsed_ast: R_AST = JSON.parse(sample_ast);
const ui_node = get_ui_assignment_node(parsed_ast);

// const parsed_sue_ast = raw_ast_to_sue_ast(ui_node);

// Find a given assignment at any depth in the tree

// function get_ui_from_ast(parsed_ast: object) {}
