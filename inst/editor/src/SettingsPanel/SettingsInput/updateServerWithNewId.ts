import type { LanguageMode } from "communication-types/src/AppInfo";
import type { ServerPositions } from "communication-types/src/MessageToBackend";

/**
 * Updates an app script with a new ID name.
 *
 * Right now this uses regex for simplicity but in the future could be updated
 * to use the AST directly.
 * @param oldId The old ID to replace
 * @param newId The new ID to replace it with
 * @param positions The positions of the old ID in the app script. This is
 * optional but if passed will be used to validate that the correct number of
 * matches were found in the app script.
 * @param appScript The app script to update
 * @param language The language mode of the app script
 *
 * @returns The updated app script with the new ID swapped in for the old ID
 */
export function updateServerWithNewId({
  oldId,
  newId,
  positions,
  appScript,
  language,
}: {
  oldId: string;
  newId: string;
  positions?: ServerPositions;
  appScript: string;
  language: LanguageMode;
}) {
  // Use regex to find the old id in the app script. If we're in R language mode
  // then the regex should look for "input" or "output" followed by a dollar
  // sign, then the old ID, then a non-word character. If we're in python mode
  // then the regex should look for "input" or "output" followed by a square
  // bracket, then the old ID, then a square bracket. Note the use of capture
  // groups here (the parentheses) so we can use the $1, $2, $3 in the replace
  // method below.
  const regexForid = new RegExp(
    language === "R"
      ? `(input|output)(\\$)(${oldId})(\\W)`
      : `(input|output)(\\[)(${oldId})(\\])`,
    "g"
  );

  // input$oldId or output$oldId. If in python mode
  // then it should look for input[oldId] or output[oldId] (note the square brackets)
  // Run find over app script and make sure we get the same number of matches as positions
  const matches = appScript.match(regexForid);

  if (matches === null) {
    throw new Error(`No matches found for ${oldId} in app script`);
  }

  // If the optional positions argument was passed. Use that to validate things
  // are working as expected
  if (positions && matches.length !== positions.length) {
    throw new Error(
      `Expected ${positions.length} matches for ${oldId} in app script but got ${matches?.length}`
    );
  }

  // Replace each match with the new id
  const newAppScript = appScript.replace(regexForid, `$1$2${newId}$4`);

  return newAppScript;
}
