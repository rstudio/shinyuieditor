type PRIMITIVES = string | number | boolean;

type AST_NODE_METADATA = {
  name?: string;
  position: [number, number, number, number];
};
type AST_NODE_VALUE = [
  value: PRIMITIVES | AST_NODE,
  meta_or_name?: AST_NODE_METADATA | string
];

type AST_NODE = AST_NODE_VALUE[];

const gridlayout_node: AST_NODE_VALUE = [
  [
    ["gridlayout::grid_page"],
    [[["c"], ["a"], ["b"]], { name: "layout", position: [1, 1, 1, 1] }],
    ["1rem", "gap_size"],
    [[["card"], ["A", "area"]], { position: [1, 2, 3, 4] }],
    [[["card"], ["B", "area"], ["B", "content"]]],
  ],
  { position: [0, 0, 10, 1] },
];
