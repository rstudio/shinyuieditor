import React from "react";

import type { AppInfo, AppScriptInfo } from "communication-types/src/AppInfo";
import type { ParserInitOptions } from "treesitter-parsers";
import { setup_python_parser, setup_r_parser } from "treesitter-parsers";

import { parsePythonAppText } from "../backendCommunication/parse_python_app";
import { parseRAppText } from "../backendCommunication/parse_r_app";
import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";

type ParseAppFn = (scripts: AppScriptInfo) => Promise<AppInfo>;

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
  const { incomingMsgs } = useBackendConnection();

  const parseAppRef = React.useRef<ParseAppFn>(() => {
    throw new Error("No parser set up yet");
  });

  React.useEffect(() => {
    // Watch for the checkin message that tells us what language we are in so we
    // can set up the appropriate parser workflow
    const infoSubscription = incomingMsgs.subscribe(
      "CHECKIN",
      ({ language, path_to_ts_wasm }) => {
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

        parseAppRef.current = (scripts) => {
          // TODO: This can/probably should be memoized to avoid re-parsing if unneccesary
          if (language === "R") {
            return parseRAppText({ scripts, parser });
          } else {
            return parsePythonAppText({ scripts, parser });
          }
        };
      }
    );

    // Make sure we unsubscribe to avoid memory leaks!
    return () => infoSubscription.unsubscribe();
  }, [incomingMsgs]);

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
