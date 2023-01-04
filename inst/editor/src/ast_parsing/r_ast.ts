import { ShinyUiNode } from "../main";

type METADATA_NODE = {
  start_pos: [number, number];
  end_pos: [number, number];
};

function is_metadata_node(x: unknown): x is METADATA_NODE {
  return (
    typeof x === "object" &&
    x !== null &&
    Object.keys(x).includes("start_pos") &&
    Object.keys(x).includes("end_pos")
  );
}

type AST_RAW_VAL = string | number | boolean | AST_RAW_VAL[];

function is_ast_raw_val(x: unknown): x is AST_RAW_VAL {
  const is_atomic =
    typeof x === "string" || typeof x === "number" || typeof x === "boolean";
  if (is_atomic) return true;

  if (Array.isArray(x)) {
    return x.every(is_ast_raw_val);
  }

  return false;
}
type AST_LEAF_NODE = AST_RAW_VAL | METADATA_NODE;

function is_ast_leaf_node(node: unknown): node is AST_LEAF_NODE {
  return is_ast_raw_val(node) || is_metadata_node(node);
}

type AST_ROOT_NODE = {
  [index: number | string]: AST_NODE;
};

type ASSIGNMENT_NODE = {
  1: "<-";
  2: string;
  3: AST_NODE;
};

type AST_NODE = AST_ROOT_NODE | AST_LEAF_NODE;

function is_ui_assignment_node(node: AST_NODE): node is ASSIGNMENT_NODE {
  if (is_ast_leaf_node(node)) return false;

  return (node[1] === "<-" || node[1] === "=") && node[2] === "ui";
}

function get_ui_assignment_node(ast: AST_NODE): AST_NODE {
  if (is_ast_leaf_node(ast)) {
    throw new Error("Trying to find assignment in leaf node");
  }

  for (const index in ast) {
    const subnode = ast[index];
    if (is_ui_assignment_node(subnode)) {
      return subnode[3];
    }
  }

  throw new Error("No ui assignment node was found in provided ast");
}

type Parsed_SUE_Node = {
  ui_name: string;
  ui_arguments: Record<string, AST_LEAF_NODE | Parsed_SUE_Node>;
  ui_children: (AST_LEAF_NODE | Parsed_SUE_Node)[];
};

function is_parsed_sue_node(node: unknown): node is Parsed_SUE_Node {
  if (typeof node !== "object" || node === null) {
    return false;
  }

  return "ui_name" in node && "ui_arguments" in node;
}

function raw_ast_to_sue_ast(ui_node: AST_NODE): Parsed_SUE_Node {
  if (is_ast_leaf_node(ui_node)) {
    throw new Error("Can't to convert leaf node to SUE ast node");
  }

  if (is_ast_leaf_node(ui_node)) {
    throw new Error("Can't to convert leaf node to SUE ast node");
  }

  const ui_arguments: Parsed_SUE_Node["ui_arguments"] = {};
  const unnamed_parameters: Parsed_SUE_Node["ui_children"] = [];
  for (const key in ui_node) {
    const raw_value = ui_node[key];
    const value =
      is_ast_leaf_node(raw_value) || Array.isArray(raw_value)
        ? raw_value
        : raw_ast_to_sue_ast(raw_value);

    const is_valid_node_type =
      is_ast_leaf_node(value) || is_parsed_sue_node(value);
    if (!is_valid_node_type) {
      throw new Error("Invalid ui node type");
    }

    const is_named_parameter = isNaN(parseInt(key));

    if (is_named_parameter) {
      ui_arguments[key] = value;
    } else {
      unnamed_parameters.push(value);
    }
  }

  const [ui_name, ...ui_children] = unnamed_parameters;

  if (typeof ui_name !== "string") {
    throw new Error("Tried to parse a non ui node as a ui node...");
  }
  return {
    ui_name,
    ui_arguments,
    ui_children,
  };
}

const sample_ast = `{"1":{"1":"library","2":"plotly","__meta__":{"start_pos":[1,1],"end_pos":[1,15]}},"2":{"1":"library","2":"shiny","__meta__":{"start_pos":[2,1],"end_pos":[2,14]}},"3":{"1":"library","2":"gridlayout","__meta__":{"start_pos":[3,1],"end_pos":[3,19]}},"4":{"1":"library","2":"DT","__meta__":{"start_pos":[4,1],"end_pos":[4,11]}},"5":{"1":"<-","2":"ui","3":{"1":"grid_page","layout":["header  header  ","sidebar area4   ","table   bluePlot","table   bluePlot"],"row_sizes":["125px","1fr","1fr","1fr"],"col_sizes":["735px","1fr"],"gap_size":"1rem","6":{"1":"grid_card","area":"sidebar","item_alignment":"top","title":"Settings","item_gap":"12px","6":{"1":"sliderInput","inputId":"bins","label":"Number of Bins","min":12,"max":100,"value":30,"animate":{"1":"animationOptions","interval":1000,"loop":false,"playButton":"play","pauseButton":"pause"},"width":"100%"}},"7":{"1":"grid_card_text","area":"header","content":"Single File App","alignment":"start","is_title":false},"8":{"1":"grid_card","area":"table","item_alignment":"center","title":"Table","scrollable":true,"item_gap":"12px","7":{"1":"DTOutput","outputId":"myTable","width":"100%"}},"9":{"1":"grid_card_plot","area":"bluePlot"},"10":{"1":"grid_card","area":"area4","3":{"1":"plotlyOutput","outputId":"distPlot","width":"100%","height":"100%"}}},"__meta__":{"start_pos":[8,1],"end_pos":[72,1]}},"6":{"1":"<-","2":"other_ui","3":"hello there","__meta__":{"start_pos":[75,1],"end_pos":[75,25]}},"7":{"1":"<-","2":"server","3":{"1":"function","2":{"input":"<MISSING>","output":"<MISSING>"},"3":{"1":"{","2":{"1":"<-","2":{"1":"$","2":"output","3":"distPlot"},"3":{"1":"renderPlotly","2":{"1":"{","2":{"1":"plot_ly","x":{"1":"~","2":{"1":"[","2":"faithful","3":"<MISSING>","4":2}},"type":"histogram","__meta__":{"start_pos":[82,5],"end_pos":[82,51]}}}},"__meta__":{"start_pos":[80,3],"end_pos":[86,4]}},"3":{"1":"<-","2":{"1":"$","2":"output","3":"bluePlot"},"3":{"1":"renderPlot","2":{"1":"{","2":{"1":"<-","2":"x","3":{"1":"[","2":"faithful","3":"<MISSING>","4":2},"__meta__":{"start_pos":[90,5],"end_pos":[90,25]}},"3":{"1":"<-","2":"bins","3":{"1":"seq","2":{"1":"min","2":"x"},"3":{"1":"max","2":"x"},"length.out":{"1":"+","2":{"1":"$","2":"input","3":"bins"},"3":1}},"__meta__":{"start_pos":[91,5],"end_pos":[91,60]}},"4":{"1":"hist","2":"x","breaks":"bins","col":"steelblue","border":"white","__meta__":{"start_pos":[94,5],"end_pos":[94,63]}}}},"__meta__":{"start_pos":[88,3],"end_pos":[95,4]}},"4":{"1":"<-","2":{"1":"$","2":"output","3":"myTable"},"3":{"1":"renderDT","2":{"1":"{","2":{"1":"head","2":"faithful","3":10,"__meta__":{"start_pos":[100,7],"end_pos":[100,24]}}}},"__meta__":{"start_pos":[98,3],"end_pos":[102,3]}}}},"__meta__":{"start_pos":[78,1],"end_pos":[103,1]}},"8":{"1":"shinyApp","2":"ui","3":"server","__meta__":{"start_pos":[105,1],"end_pos":[105,20]}}}`;
const parsed_ast: AST_NODE = JSON.parse(sample_ast);
const ui_node = get_ui_assignment_node(parsed_ast);

const parsed_sue_ast = raw_ast_to_sue_ast(ui_node);

// Find a given assignment at any depth in the tree

// function get_ui_from_ast(parsed_ast: object) {}
