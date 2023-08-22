type NameObject = { [name: string]: boolean };

/**
 * Merges multiple and conditional classes into single string.
 *
 * @param classes Classes to merge. Can take the form of a string, an object
 * with key of class name and value of a boolean to determine if the class
 * should be added, or an array of any of the above.
 * @returns A string of all classes to be added separated by spaces.
 *
 * @example
 * mergeClasses("foo", "bar"); // "foo bar"
 * mergeClasses("foo", undefined, "bar", null); // "foo bar"
 * mergeClasses("foo", { bar: false, baz: true }) // "foo baz"
 */
export function mergeClasses(
  ...classes: (string | string[] | NameObject | false | null | undefined)[]
): string {
  let classNames: string[] = [];

  classes.forEach((c) => {
    if (!c) {
      return;
    }

    if (typeof c === "string") {
      classNames.push(c);
      return;
    }

    if (Array.isArray(c)) {
      classNames.push(...c.map((x) => mergeClasses(x)));
      return;
    }

    if (typeof c === "object") {
      classNames.push(
        ...Object.entries(c)
          .filter(([, v]) => v)
          .map(([k]) => k)
      );
    }
  });

  return classNames.join(" ");
}
