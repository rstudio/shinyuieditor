// There is no @types/tree-sitter-python package, so we have to create our own
// declaration file for the tree-sitter-python package. We only need to pass the
// main export to the main tree-sitter package and it can be any typed so no
// need to get fancy
declare module "tree-sitter-python" {
  const PythonGrammar: unknown;
  export default PythonGrammar;
}
