import type { Script_Position } from "ast-parsing";
import type { Output_Server_Pos } from "ast-parsing/src/get_assignment_nodes";
import { indent_text_block } from "ast-parsing/src/indent_text_block";
import type {
  InputSourceRequest,
  OutputSourceRequest,
} from "communication-types";
import type { SnippetInsertRequest } from "communication-types/src/MessageToBackend";
import * as vscode from "vscode";

import { selectMultupleLocations } from "./extension-api-utils/selectMultupleLocations";
import type { App_Parser } from "./R-Utils/parseRApp";

// Dangerous assumption here
const INDENT_SPACES = 2;

export async function selectOutputReferences({
  editor,
  output: { outputId, renderScaffold },
  get_ast,
}: {
  editor: vscode.TextEditor;
  get_ast: App_Parser;
  output: OutputSourceRequest;
}) {
  const app_text = editor.document.getText();

  const app_ast_res = await get_ast();

  const fullOutput = `output$${outputId}`;

  const matches_for_output =
    app_ast_res.type === "SUCCESS"
      ? find_with_ast(app_ast_res.output_positions, outputId)
      : find_with_regex(app_text, fullOutput);

  if (matches_for_output) {
    // If we found matches, select them
    selectInEditor(editor, matches_for_output);
    // Set the selection to found outputs
    editor.selection = matches_for_output[0];

    // Make sure that the user can actually see those outputs.
    editor.revealRange(matches_for_output[0]);
    return;
  }

  if (app_ast_res.type === "ERROR") {
    // Tell user there's nothing we can do.
    vscode.window.showErrorMessage(
      `Failed to find any current use of ${fullOutput} in server with error./nError msg: ${app_ast_res.message}`
    );
    return;
  }

  if (app_ast_res.type === "EMPTY") {
    // Somehow we requested output matches on an empty app?
    throw new Error("Can't find output instances in an empty app");
  }

  type Proceed_Option =
    | "Generate template"
    | "Proceed without creating template";

  const proceed_choices: Proceed_Option[] = [
    "Generate template",
    "Proceed without creating template",
  ];

  const proceed_choice = (await vscode.window.showQuickPick(proceed_choices, {
    title: "No output bindings found in app code. Generate one from template?",
  })) as Proceed_Option | undefined;

  if (proceed_choice !== "Generate template") {
    vscode.window.showInformationMessage("No output template generated");
    return;
  }
  // If no existing matches were found. Add a template in for the user to use
  const server_position = script_position_to_vscode_positions(
    app_ast_res.server_pos
  );

  const server_indent =
    editor.document.lineAt(server_position.end.line)
      .firstNonWhitespaceCharacterIndex + INDENT_SPACES;

  // Fill in the template at bottom of server

  // We want to match the indentation of the server block and also add a new
  // line at the end so the closing of the server is actually finished.
  const renderTemplate = new vscode.SnippetString(
    indent_text_block(
      `\noutput\\$${outputId} <- ${renderScaffold}`,
      server_indent
    ) + "\n"
  );
  const successfull_template_add = await editor.insertSnippet(
    renderTemplate,
    server_position.end.translate(0, -1)
  );

  if (!successfull_template_add) {
    // Tell user there's nothing we can do.
    vscode.window.showErrorMessage(`Failed to add output scaffold`);
  }
}

export async function insert_code_snippet({
  editor,
  snippet,
  below_line,
}: { editor: vscode.TextEditor } & SnippetInsertRequest) {
  // Fill in the template at bottom of server
  const where_to_insert = editor.document.validatePosition(
    new vscode.Position(below_line - 1, Infinity)
  );

  const successfull_template_add = await editor.insertSnippet(
    new vscode.SnippetString("\n" + snippet),
    where_to_insert
  );

  if (!successfull_template_add) {
    // Tell user there's nothing we can do.
    vscode.window.showErrorMessage(`Failed to add output scaffold`);
  }
}

export function select_app_lines({
  editor,
  selections,
}: {
  editor: vscode.TextEditor;
  selections: Script_Position[];
}) {
  selectInEditor(
    editor,
    selections.map((pos) => {
      const vscode_positions = script_position_to_vscode_positions(pos);
      return new vscode.Selection(vscode_positions.start, vscode_positions.end);
    })
  );
}

export async function selectInputReferences({
  editor,
  input: { inputId },
}: {
  editor: vscode.TextEditor;
  input: InputSourceRequest;
}) {
  const fullInput = `input$${inputId}`;
  const to_find = fullInput;
  const app_text = editor.document.getText();
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

  if (lines_with_output.length === 0) return null;

  const selection_locations = lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;
    const searchStart = new vscode.Position(line, startChar);
    // Add to account for length of prefix
    const searchEnd = new vscode.Position(line, startChar + to_find.length);

    return new vscode.Location(
      editor.document.uri,
      new vscode.Range(searchStart, searchEnd)
    );
  });

  // Force companion editor to be in focus. Otherwise the selection will show up
  // on whatever was most recently clicked on which can kill the custom editor
  // etc..
  vscode.window.showTextDocument(editor.document);
  await selectMultupleLocations({
    uri: editor.document.uri,
    locations: selection_locations,
    noResultsMessage: `Failed to find any current use of ${fullInput} in server`,
  });
}
async function selectInEditor(
  editor: vscode.TextEditor,
  selections: vscode.Selection[]
) {
  // Set the selection to found outputs
  editor.selection = selections[0];

  // Make sure that the user can actually see those outputs.
  editor.revealRange(selections[0]);
}

export function script_position_to_vscode_positions([
  start_row,
  start_col,
  end_row,
  end_col,
]: Script_Position): { start: vscode.Position; end: vscode.Position } {
  return {
    start: new vscode.Position(start_row - 1, start_col - 1),
    end: new vscode.Position(end_row - 1, end_col),
  };
}

function find_with_ast(
  output_positions: Output_Server_Pos,
  outputId: string
): vscode.Selection[] | null {
  const position_for_output = output_positions[outputId];

  if (!position_for_output) return null;

  return position_for_output.map((pos) => {
    const vscode_positions = script_position_to_vscode_positions(pos);
    return new vscode.Selection(vscode_positions.start, vscode_positions.end);
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function find_with_regex(
  app_text: string,
  to_find: string
): vscode.Selection[] | null {
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

  if (lines_with_output.length === 0) return null;

  return lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;
    const searchStart = new vscode.Position(line, startChar);
    // Add to account for length of prefix
    const searchEnd = new vscode.Position(line, startChar + to_find.length);

    return new vscode.Selection(searchStart, searchEnd);
  });
}
