/**
 * Generate a node for an unknown UI function from text.
 * @param text The text of the function call
 * @param explanation An optional explanation of why the function is unknown
 * @returns A node for the unknown UI function
 */
export function makeUnknownUiFunction(text: string, explanation?: string) {
  return {
    id: "unknownUiFunction",
    namedArgs: {
      text,
      explanation,
    },
  };
}
