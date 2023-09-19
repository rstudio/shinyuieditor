import type { ParserNode } from ".";
/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export declare function getNodePosition(node: ParserNode): {
    start: {
        row: number;
        column: number;
    };
    end: {
        row: number;
        column: number;
    };
};
/**
 * Get position of the server node in the script in Ui-Editor friendly format
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns Location of the server node in the script
 */
export declare function getNodePositionAndIndent(server_node: ParserNode): {
    server_fn: {
        start: {
            row: number;
            column: number;
        };
        end: {
            row: number;
            column: number;
        };
    };
    indent: number;
};
