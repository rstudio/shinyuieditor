import type { ShinyUiNode } from "editor";

import type {
  Multi_File_App_Type,
  Multi_File_Raw_App_Info,
  Raw_App_Info,
  Script_Position,
  Single_File_App_Type,
  Single_File_Raw_App_Info,
} from ".";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";
import type {
  Assignment_Operator,
  Output_Server_Pos,
} from "./get_assignment_nodes";
import {
  get_assignment_nodes,
  get_output_positions,
  get_server_assignment_node,
  get_ui_assignment_node,
} from "./get_assignment_nodes";

type Parsed_AST = {
  ui_tree: ShinyUiNode;
  ui_pos: Script_Position;
  ui_assignment_operator: Assignment_Operator;
  server_pos: Script_Position;
  server_node: ReturnType<typeof get_server_assignment_node>;
  output_positions: Output_Server_Pos;
};

export type Parsed_Multi_File_AST = {
  app_type: Multi_File_App_Type;
  ui: Pick<Parsed_AST, "ui_tree" | "ui_pos" | "ui_assignment_operator">;
  server: Pick<Parsed_AST, "server_node" | "server_pos" | "output_positions">;
};

export type Parsed_Single_File_AST = {
  app_type: Single_File_App_Type;
  app: Parsed_AST;
};

export function parse_app_ast(
  info: Multi_File_Raw_App_Info
): Parsed_Multi_File_AST;

export function parse_app_ast(
  info: Single_File_Raw_App_Info
): Parsed_Single_File_AST;

export function parse_app_ast(info: Raw_App_Info) {
  return info.app_type === "SINGLE-FILE"
    ? parse_single_file_ast(info)
    : parse_multi_file_ast(info);
}

function parse_single_file_ast({
  app: { ast },
}: Single_File_Raw_App_Info): Parsed_Single_File_AST {
  const assignment_nodes = get_assignment_nodes(ast);
  const ui_node = get_ui_assignment_node(assignment_nodes);
  const server_node = get_server_assignment_node(assignment_nodes);
  const output_positions = get_output_positions(assignment_nodes);

  return {
    app_type: "SINGLE-FILE",
    app: {
      ui_tree: ast_to_ui_node(ui_node.val[2]),
      ui_pos: ui_node.pos,
      ui_assignment_operator: ui_node.val[0].val,
      server_pos: server_node.pos,
      server_node,
      output_positions,
    },
  };
}

function parse_multi_file_ast({
  ui,
  server,
}: Multi_File_Raw_App_Info): Parsed_Multi_File_AST {
  const ui_assignment_nodes = get_assignment_nodes(ui.ast);
  const ui_node = get_ui_assignment_node(ui_assignment_nodes);

  const server_assignment_nodes = get_assignment_nodes(server.ast);
  const server_node = get_server_assignment_node(server_assignment_nodes);

  const output_positions = get_output_positions(server_assignment_nodes);

  return {
    app_type: "MULTI-FILE",
    ui: {
      ui_tree: ast_to_ui_node(ui_node.val[2]),
      ui_pos: ui_node.pos,
      ui_assignment_operator: ui_node.val[0].val,
    },
    server: {
      server_node,
      output_positions,
      server_pos: server_node.pos,
    },
  };
}
