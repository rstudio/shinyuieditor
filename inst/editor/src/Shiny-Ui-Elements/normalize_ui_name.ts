import { shinyUiNames } from "./uiNodeTypes";

const get_has_namespace = /^\w+::/;

/**
 * Convert a potentially unspaced ui function name to a namespaced one
 * @param fn_name Either bare or namespaced ui name
 * @returns Namespace ui name
 */
export function normalize_ui_name(fn_name: string): string {
  // If the namespace is already on the name, then just return it
  if (get_has_namespace.test(fn_name)) return fn_name;

  // If we have a bare function name we need to loop through the known full
  // function names and find the one that ends with the passed bare name
  const find_ends_in_fn_name = new RegExp(`^\\w+::${fn_name}$`);

  for (const full_name of shinyUiNames) {
    if (find_ends_in_fn_name.test(full_name)) {
      return full_name;
    }
  }

  // If we didnt' find the function in our known functions something has gone
  // wrong so we should error
  throw new Error(
    `Unknown function ${fn_name} made it passed the unknown function filter`
  );
}
