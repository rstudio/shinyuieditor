import React from "react";

import type { ParserInitOptions } from "treesitter-parsers";
import { setup_python_parser, setup_r_parser } from "treesitter-parsers";

import type { ParsedAppInfo } from "../parsing/ParsedAppInfo";
import { parsePythonApp } from "../python-parsing/parsePythonApp";
import { parseRApp } from "../r-parsing/parseRApp";
import { useMetaData } from "../state/metaData";

type ParseAppFn = (app_script: string) => Promise<ParsedAppInfo>;

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
export function TSParserProvider({
  children,
  pathToTreeSitterWasm,
}: {
  children: React.ReactNode;
  /**
   * Optional path to the treesitter wasm bundle. This is useful when we're embedding
   */
  pathToTreeSitterWasm?: string;
}) {
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

    const { language, path_to_ts_wasm: pathToTSFromMeta } = metaData;
    const parserInitOptions: ParserInitOptions = {};

    const pathToWasm = pathToTreeSitterWasm || pathToTSFromMeta;

    if (pathToWasm) {
      // If we're in a vscode extension we will have info on where to find the
      // wasm bundle that we need to respect or else the parser will fail to load
      parserInitOptions.locateFile = () => pathToWasm;
    }

    const parser =
      language === "R"
        ? setup_r_parser(parserInitOptions)
        : setup_python_parser(parserInitOptions);

    parseAppRef.current = async (app_script) => {
      // TODO: This can/probably should be memoized to avoid re-parsing if unneccesary
      const ready_parser = await parser;
      if (language === "R") {
        return parseRApp(ready_parser, app_script);
      } else {
        return parsePythonApp(ready_parser, app_script);
      }
    };

    initializedParser.current = true;
  }, [metaData, pathToTreeSitterWasm]);

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
