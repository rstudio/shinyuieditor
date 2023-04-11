export type Primatives = string | number | boolean;

export type Script_Position = [
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

export const ast_name_to_key = {
  symbol: "s",
  character: "c",
  boolean: "b",
  number: "n",
  unknown: "u",
  expression: "e",
} as const;

export type AST_Name_To_Key = typeof ast_name_to_key;

export type AST_Node_By_Key = {
  [key in keyof Node_Vals_By_Key]: {
    val: Node_Vals_By_Key[key];
    type: key;
    name?: string;
    pos?: Script_Position;
  };
};

export type AST_Node_By_Name = {
  [Name in keyof AST_Name_To_Key]: AST_Node_By_Key[AST_Name_To_Key[Name]];
};

export type Expression_Node<T extends R_AST> = {
  val: T;
  type: "e";
  pos?: Script_Position;
};
export type Symbol_Node<Sym extends string> = {
  val: Sym;
  type: "s";
  pos?: Script_Position;
};
export type Branch_Node = AST_Node_By_Key["e"];
export type Function_Node = Expression_Node<
  [AST_Node_By_Name["symbol"], ...R_AST_Node[]]
>;
export type Leaf_Node = AST_Node_By_Key["c" | "b" | "n"];
export type Unparsable_Node = AST_Node_By_Key["s" | "m" | "u"];
export type R_AST_Node = AST_Node_By_Key[keyof Node_Vals_By_Key];

export type R_AST = Array<R_AST_Node>;
