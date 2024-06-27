/**
 *
 * @param text The raw text of a function body
 * @returns Formatted text with the intention of taking up as little horizontal
 * space as possible
 *
 * @example
 * ```
 * my_custom_fn(foo="bar", arg2=false)
 * ```
 *
 * becomes:
 *
 *```
 * my_custom_fn(
 *   foo="bar",
 *   arg2=false
 * )
 * ```
 */
export function formatFunctionText(text: string): string {
  return (
    text
      // Add a newline after an opening parentheses that has content within it
      .replaceAll(/\(/g, "(\n  ")

      // Put closing parenthesis on new line
      .replaceAll(/\)/g, "\n)")

      // Bring parenthesis with just space between them together - this needs to
      // go after the other parenthesis parsing to avoid using a
      // look-ahead/behinds which are not supported in Safari
      .replaceAll(/\(\s+\)/g, "()")

      // Put each argument on a new line
      .replaceAll(/,/g, ",\n ")

      // Remove trailing white space
      .replaceAll(/(\s+)$/g, "")
  );
}
