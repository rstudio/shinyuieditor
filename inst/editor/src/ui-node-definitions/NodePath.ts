/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type PathElement = number | string;
export type NodePath = PathElement[];
