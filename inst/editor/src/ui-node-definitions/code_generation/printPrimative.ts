import type { Primatives } from "../../parsing/Primatives";

/**
 * Print a primative value to R or python code.
 * Handles special cases like special strings and booleans
 * @param val
 * @returns
 */
export function printPrimative(val: Primatives): string {
  switch (typeof val) {
    case "string": {
      return safeStringPrint(val);
    }

    default:
      return String(val);
  }
}

/**
 * Escape special characters in a string for R or python code
 * @param str The string to escape
 * @returns The string with special characters like slashes and quotes escaped
 */
export function safeStringPrint(str: string): string {
  // Right now we just use json stringify to escape special characters but in
  // the future this may not be enough so we abstract it to a function so we
  // don't have to change a million locations
  return JSON.stringify(str);
}
