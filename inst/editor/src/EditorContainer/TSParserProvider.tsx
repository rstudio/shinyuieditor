import React from "react";

import type { AppInfo } from "communication-types/src/AppInfo";
import type { ParserInitOptions } from "treesitter-parsers";
import { setup_python_parser, setup_r_parser } from "treesitter-parsers";

import { parsePythonAppText } from "../backendCommunication/parse_python_app";
import { parseRAppText } from "../backendCommunication/parse_r_app";
import { useMetaData } from "../state/metaData";

type ParseAppFn = (app_script: string) => Promise<AppInfo>;

const TSParserContext = React.createContext<ParseAppFn>(() => {
  throw new Error("No context available for parser");
});

/**
 * Setup a context provider to make a parsing function available to app.
 *
 * This function will set up the appropriate parser based on the language of the
 * app and make it available to children via context. It handles listening for
 * messages from the server and setting up the correct parser.
 *
 * @param props.children Children for composition
 */
export function TSParserProvider({ children }: { children: React.ReactNode }) {
  const metaData = useMetaData();
  const parseAppRef = React.useRef<ParseAppFn>(() => {
    throw new Error("No parser set up yet");
  });

  const initializedParser = React.useRef(false);

  // This useeffect listens for the metadata handshake from the server and
  // initializes the parser once it knows the language to use.
  React.useEffect(() => {
    if (metaData === null) return;

    if (initializedParser.current) {
      // eslint-disable-next-line no-console
      console.warn(
        "Parser already initialized but recieved request to re-init"
      );
    }

    const { language, path_to_ts_wasm } = metaData;
    const parserInitOptions: ParserInitOptions = {};

    if (path_to_ts_wasm) {
      // If we're in a vscode extension we will have info on where to find the
      // wasm bundle that we need to respect or else the parser will fail to load
      const pathToWasm = path_to_ts_wasm;
      parserInitOptions.locateFile = () => pathToWasm;
    }

    const parser =
      language === "R"
        ? setup_r_parser(parserInitOptions)
        : setup_python_parser(parserInitOptions);

    parseAppRef.current = (app_script) => {
      // TODO: This can/probably should be memoized to avoid re-parsing if unneccesary
      if (language === "R") {
        return parseRAppText({ app_script, parser });
      } else {
        return parsePythonAppText({ app_script, parser });
      }
    };

    initializedParser.current = true;
  }, [metaData]);

  // This callback remains referentially the same so that the parser can be
  // updated without triggering a whole app rerender
  const parseAppFn = React.useCallback<ParseAppFn>(
    (scripts) => parseAppRef.current?.(scripts),
    []
  );

  return (
    <TSParserContext.Provider value={parseAppFn}>
      {children}
    </TSParserContext.Provider>
  );
}

/**
 * Hook to grab the function to parse app scripts from context.
 *
 * @returns A referentially stable function that can be used to parse a given
 * app from its script(s)
 */
export function useTsParser() {
  return React.useContext(TSParserContext);
}
