import type { R_AST } from "r-ast-parsing";
import { raw_R_info_to_app_info } from "r-ast-parsing/src/raw_R_info_to_app_info";
import { is_object } from "util-functions/src/is_object";
import { makePortableString } from "util-functions/src/strings";

import type { INFO_GET_RESULTS } from "../App_Parser";

import { parse_R_app_server_info } from "./parse_R_app_server_info";
import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

export function makeRAppInfoGetter(rProc: ActiveRSession) {
  return async function getRAppInfo(
    fileText: string
  ): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
    const escapedAppText = makePortableString(fileText);

    const parseCommand = `shinyuieditor:::safe_parse_and_serialize("${escapedAppText}")`;

    const parsedCommandOutput = await rProc.runCmd(parseCommand, {
      verbose: false,
      timeout_ms: 5000,
    });

    if (parsedCommandOutput.status === "error") {
      return parsedCommandOutput;
    }

    try {
      const output_response = JSON.parse(
        parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
      );

      assert_is_ast_parse_response(output_response);

      if (output_response.type === "error") {
        return {
          status: "error",
          errorMsg: output_response.msg,
        };
      }

      // Nothing will get returned if we've provided an empty file
      if (Object.keys(output_response.ast).length === 0) {
        return { status: "success", values: "EMPTY" };
      }

      const raw_ast = output_response.ast;

      const parsed_info = raw_R_info_to_app_info({
        app_type: "SINGLE-FILE",
        app: { ast: raw_ast, script: fileText },
      });

      const server_info = parse_R_app_server_info(
        output_response.ast,
        fileText
      );

      return {
        status: "success",
        values: { ui: parsed_info, server: server_info },
      };
    } catch {
      return {
        status: "error",
        errorMsg:
          "Something went wrong parsing app. Check to make sure your app text doesn't contain any syntax errors.",
      };
    }
  };
}

function assert_is_ast_parse_response(parse_res: unknown): asserts parse_res is
  | {
      type: "success";
      ast: R_AST;
    }
  | {
      type: "error";
      msg: string;
    } {
  if (
    is_object(parse_res) &&
    "type" in parse_res &&
    (parse_res.type === "success" || parse_res.type === "error")
  ) {
    return;
  }

  throw new Error(
    "Parse result does not appear to be from safe ast parse function"
  );
}
