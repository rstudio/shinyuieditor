/// <reference types="web-tree-sitter" />
import type { Brand } from "util-functions/src/TypescriptUtils";
import type { ParserNode } from ".";
type TSCallNode = Brand<ParserNode, "CallNode">;
export declare function is_call_node(node: ParserNode): node is TSCallNode;
/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export declare function extract_call_content(node: TSCallNode): {
    fn_name: string;
    fn_args: import("web-tree-sitter").SyntaxNode[];
};
export {};
