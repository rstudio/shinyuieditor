import { existsSync } from "fs";

import { removeQuotes } from "util-functions/src/strings";

// import { getRPathFromConfig } from "./getRPathFromConfig";
import { getRpathFromSystem } from "./getRpathFromSystem";

export async function getPathToR(): Promise<string> {
  // // First we check to see if the user has set a config for the R path
  // let pathToR = getRPathFromConfig();

  // // If that didn't work, attempt to pull directly from the system.
  // if (!pathToR) {
  //   pathToR = await getRpathFromSystem();
  // }

  const pathToR = await getRpathFromSystem();

  if (!pathToR) {
    // inform user about missing R path:
    const errMsg = `Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;
    throw new Error(errMsg);
  }

  if (!existsSync(pathToR)) {
    const errMsg = `Path to R is invalid: ${pathToR}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;
    throw new Error(errMsg);
  }

  return removeQuotes(pathToR);
}
