import type { Script_Range } from "communication-types/src/MessageToBackend";
import type { R_AST } from "r-bindings";
import { pos_to_script_range } from "r-bindings";
import {
  get_assignment_nodes,
  get_server_assignment_node,
  get_output_positions,
} from "r-bindings";

import type { Server_Info } from "../App_Parser";

export function parse_R_app_server_info(
  ast: R_AST,
  app_text: string
): Server_Info {
  const assignment_nodes = get_assignment_nodes(ast);
  const server_fn_range = pos_to_script_range(
    get_server_assignment_node(assignment_nodes).pos
  );
  const output_positions = get_output_positions(assignment_nodes);

  return {
    app_type: "SINGLE-FILE",
    server_pos: {
      server_fn: server_fn_range,
      indent: 2,
    },
    get_output_position: (outputId: string) =>
      output_positions.get(outputId) ?? [],
    get_input_positions: (input_id: string) =>
      findRInputReferences({ app_text, input_id }),
  } as const;
}

function findRInputReferences({
  app_text,
  input_id,
}: {
  app_text: string;
  input_id: string;
}) {
  const fullInput = `input$${input_id}`;
  const to_find = fullInput;
  const doc_lines = app_text.split("\n");

  // To find valid examples we want to check:
  // 1. That we're not looking after a comment, aka not active code. and
  // 2. That right after our searched for variable we have a non word token to
  //    avoid over-eager findings like input$bins2 matching when we're searching
  //    for input$bins
  const regex_for_output = new RegExp(
    `(?<!#.*)${escapeRegExp(to_find)}(?=\\W)`
  );
  const lines_with_output = doc_lines
    .map((l, i) => ({
      line: i,
      match: regex_for_output.exec(l),
    }))
    .filter(({ match }) => match !== null);

  if (lines_with_output.length === 0) return [];

  return lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;

    const row = line;

    return {
      start: { row, column: startChar },
      end: { row, column: startChar + to_find.length },
    } as Script_Range;
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}