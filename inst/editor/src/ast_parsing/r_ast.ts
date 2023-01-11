import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";
type Primatives = string | number | boolean;

type Script_Position = [
  start_row: number,
  start_col: number,
  end_row: number,
  end_col: number
];
type AST_Node_Generic<T extends any> = {
  val: T;
  name?: string;
  pos?: Script_Position;
};
type Branch_Node = AST_Node_Generic<R_AST>;
type Leaf_Node = AST_Node_Generic<Primatives>;

type Assignment_Node = AST_Node_Generic<
  [AST_Node_Generic<"<-">, AST_Node_Generic<string>, Branch_Node]
>;

export type R_AST_Node = Branch_Node | Leaf_Node;
type Named_Node = Required<Pick<R_AST_Node, "val" | "name">>;

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

function is_ast_branch_node(node: unknown): node is Branch_Node {
  return is_object(node) && "val" in node && Array.isArray(node.val);
}

function is_named_node(node: unknown): node is Named_Node {
  return is_object(node) && "name" in node;
}

function is_ui_assignment_node(node: R_AST_Node): node is Assignment_Node {
  if (is_ast_leaf_node(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  return is_assignment && val[1].val === "ui";
}

export function get_ui_assignment_node(ast: R_AST): Branch_Node {
  for (const index in ast) {
    const subnode = ast[index];
    if (is_ui_assignment_node(subnode) && is_ast_branch_node(subnode.val[2])) {
      return subnode.val[2];
    }
  }

  throw new Error("No ui assignment node was found in provided ast");
}

type Shiny_Ui_Argument_Val =
  | Primatives
  | Primative_Array
  | ShinyUiNodeByName["unknownUiFunction"];

type Shiny_Ui_AST = {
  ui_name: string;
  ui_arguments: Record<string, Shiny_Ui_Argument_Val>;
  ui_children: Shiny_Ui_AST[];
};

function flatten_node({ val }: Branch_Node): Shiny_Ui_AST {
  const [fn_name, ...args] = val;

  const ui_name = fn_name.val;
  if (typeof ui_name !== "string") {
    throw new Error("Invalid ui node, name is not a primative");
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

  if (is_array_node(node.val)) {
    return flatten_array(node.val);
  }

  return create_unknownUiFunction(node);
}

export function create_unknownUiFunction(
  node: Branch_Node
): ShinyUiNodeByName["unknownUiFunction"] {
  return {
    uiName: "unknownUiFunction",
    uiArguments: { text: build_function_text(node) },
  };
}

function build_function_text({ val }: Branch_Node): string {
  const [fn_name, ...args] = val;

  if (typeof fn_name.val !== "string") {
    return "Unknown Ui Code";
  }

  // TODO: Finish by concatenating arguments together.

  return `${fn_name.val}`;
}

function process_unnamed_arg(node: R_AST_Node): Shiny_Ui_AST {
  if (is_ast_leaf_node(node)) {
    throw new Error("Primative found in ui children of ui node.");
  }

  return flatten_node(node);
}

type Primative_Array = (Primatives | Primative_Array)[];

function is_array_node(node: R_AST): boolean {
  return node[0].val === "c";
}

export function flatten_array(node: R_AST): Primative_Array {
  const [call, ...vals] = node;

  if (call.val !== "c") {
    throw new Error("Tried to flatten non array as array");
  }

  return vals.map(({ val }) => (is_primative(val) ? val : flatten_array(val)));
}

const sample_ast = `[{"val":[{"val":"library"},{"val":"plotly"}],"pos":[1,1,1,15]},{"val":[{"val":"library"},{"val":"shiny"}],"pos":[2,1,2,14]},{"val":[{"val":"library"},{"val":"gridlayout"}],"pos":[3,1,3,19]},{"val":[{"val":"library"},{"val":"DT"}],"pos":[4,1,4,11]},{"val":[{"val":"<-"},{"val":"ui"},{"val":[{"val":"grid_page"},{"name":"layout","val":[{"val":"c"},{"val":"header  header  "},{"val":"sidebar area4   "},{"val":"table   bluePlot"},{"val":"table   bluePlot"}]},{"name":"row_sizes","val":[{"val":"c"},{"val":"125px"},{"val":"1fr"},{"val":"1fr"},{"val":"1fr"}]},{"name":"col_sizes","val":[{"val":"c"},{"val":"735px"},{"val":"1fr"}]},{"name":"gap_size","val":"1rem"},{"val":[{"val":"grid_card"},{"name":"area","val":"sidebar"},{"name":"item_alignment","val":"top"},{"name":"title","val":"Settings"},{"name":"item_gap","val":"12px"},{"val":[{"val":"sliderInput"},{"name":"inputId","val":"bins"},{"name":"label","val":"Number of Bins"},{"name":"min","val":12},{"name":"max","val":100},{"name":"value","val":30},{"name":"animate","val":[{"val":"animationOptions"},{"name":"interval","val":1000},{"name":"loop","val":false},{"name":"playButton","val":"play"},{"name":"pauseButton","val":"pause"}]},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_text"},{"name":"area","val":"header"},{"name":"content","val":"Single File App"},{"name":"alignment","val":"start"},{"name":"is_title","val":false}]},{"val":[{"val":"grid_card"},{"name":"area","val":"table"},{"name":"item_alignment","val":"center"},{"name":"title","val":"Table"},{"name":"scrollable","val":true},{"name":"item_gap","val":"12px"},{"val":[{"val":"DTOutput"},{"name":"outputId","val":"myTable"},{"name":"width","val":"100%"}]}]},{"val":[{"val":"grid_card_plot"},{"name":"area","val":"bluePlot"}]},{"val":[{"val":"grid_card"},{"name":"area","val":"area4"},{"val":[{"val":"plotlyOutput"},{"name":"outputId","val":"distPlot"},{"name":"width","val":"100%"},{"name":"height","val":"100%"}]}]}]}],"pos":[8,1,72,1]},{"val":[{"val":"<-"},{"val":"other_ui"},{"val":"hello there"}],"pos":[75,1,75,25]},{"val":[{"val":"<-"},{"val":"server"},{"val":[{"val":"function"},{"val":[{"name":"input","val":""},{"name":"output","val":""}]},{"val":[{"val":"{","pos":[78,35,78,35]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"distPlot"}]},{"val":[{"val":"renderPlotly"},{"val":[{"val":"{","pos":[80,35,80,35]},{"val":[{"val":"plot_ly"},{"name":"x","val":[{"val":"~"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}]},{"name":"type","val":"histogram"}],"pos":[82,5,82,51]}]}]}],"pos":[80,3,86,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"bluePlot"}]},{"val":[{"val":"renderPlot"},{"val":[{"val":"{","pos":[88,33,88,33]},{"val":[{"val":"<-"},{"val":"x"},{"val":[{"val":"["},{"val":"faithful"},{"val":""},{"val":2}]}],"pos":[90,5,90,25]},{"val":[{"val":"<-"},{"val":"bins"},{"val":[{"val":"seq"},{"val":[{"val":"min"},{"val":"x"}]},{"val":[{"val":"max"},{"val":"x"}]},{"name":"length.out","val":[{"val":"+"},{"val":[{"val":"$"},{"val":"input"},{"val":"bins"}]},{"val":1}]}]}],"pos":[91,5,91,60]},{"val":[{"val":"hist"},{"val":"x"},{"name":"breaks","val":"bins"},{"name":"col","val":"steelblue"},{"name":"border","val":"white"}],"pos":[94,5,94,63]}]}]}],"pos":[88,3,95,4]},{"val":[{"val":"<-"},{"val":[{"val":"$"},{"val":"output"},{"val":"myTable"}]},{"val":[{"val":"renderDT"},{"val":[{"val":"{","pos":[99,5,99,5]},{"val":[{"val":"head"},{"val":"faithful"},{"val":10}],"pos":[100,7,100,24]}]}]}],"pos":[98,3,102,3]}]}]}],"pos":[78,1,103,1]},{"val":[{"val":"shinyApp"},{"val":"ui"},{"val":"server"}],"pos":[105,1,105,20]}]`;

const parsed_ast: R_AST = JSON.parse(sample_ast);
const ui_node = get_ui_assignment_node(parsed_ast);

const flattened = flatten_node(ui_node);

const sliderTest = flattened["ui_children"][0]["ui_children"];
// const parsed_sue_ast = raw_ast_to_sue_ast(ui_node);

// Find a given assignment at any depth in the tree

// function get_ui_from_ast(parsed_ast: object) {}
