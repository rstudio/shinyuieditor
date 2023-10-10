import React from "react";

import type {
  InputOutputLocations,
  ServerPositions,
} from "communication-types/src/MessageToBackend";

import { useMetaData } from "../state/metaData";
import type { OutputBindingScaffold } from "../ui-node-definitions/nodeInfoFactory";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import { getUiNodeInfo } from "../ui-node-definitions/uiNodeTypes";

import { useUpToDateServerLocations } from "./useUpToDateServerLocations";

export type ServerOutputBindingInfo = {
  inputOrOutput: "output";
  currentId: string;
  positions?: ServerPositions;
  renderScaffold: OutputBindingScaffold;
};

export type ServerInputBindingInfo = {
  inputOrOutput: "input";
  currentId: string;
  positions?: ServerPositions;
};

/**
 * Information regarding the server binding of an input or output node
 */
export type ServerBindingInfo = {
  serverNode: InputOutputLocations["server_fn"];
} & (ServerOutputBindingInfo | ServerInputBindingInfo);

/**
 * Hook to get a function for getting the server binding info for a node.
 *
 * @returns A function that takes a node and returns the server binding info for
 * that node. If the node is not an input or output, then null is returned.
 *
 */
export function useGetNodeServerBindingInfo(): (
  node: ShinyUiNode
) => ServerBindingInfo | null {
  const metaData = useMetaData();

  const language = metaData?.language ?? "R";

  const currentServerLocations = useUpToDateServerLocations();

  const getNodeServerBindingInfo = React.useCallback(
    (node: ShinyUiNode) => {
      const nodeInfo = getUiNodeInfo(node.id);
      if (currentServerLocations === null) return null;

      const boundIdInfo = nodeInfo.serverBindingInfo;

      if (boundIdInfo === null) return null;

      const { argName, argType } = boundIdInfo;
      const currentId = node.namedArgs[argName];

      if (typeof currentId !== "string") {
        // throw new Error( `Expected value of node id to be a string but got
        //   ${typeof currentId}`
        // );
        // Note that this causes issue with grid_card_output because it tries to
        // be clever with the id where it can be the area if no id is provided.
        // This just means special server aware functionality doesn't work here.
        // A lesson to not repeat that pattern in the future.
        return null;
      }

      const positions =
        currentServerLocations[
          argType === "input" ? "input_positions" : "output_positions"
        ]?.[currentId] ?? null;

      if (argType === "output") {
        const langInfo = nodeInfo[language === "PYTHON" ? "py_info" : "r_info"];

        if (!("output_bindings" in langInfo)) {
          throw new Error(
            `Could not find output bindings for node ${node.id} with key ${argName}`
          );
        }

        const renderScaffold = langInfo.output_bindings.renderScaffold;

        return {
          inputOrOutput: argType,
          renderScaffold,
          currentId,
          positions,
          serverNode: currentServerLocations.server_fn,
        };
      }

      return {
        inputOrOutput: argType,
        currentId,
        positions,
        serverNode: currentServerLocations.server_fn,
      };
    },
    [currentServerLocations, language]
  );

  return getNodeServerBindingInfo;
}
