// Put here so we're not tied to a given build tool's decision on where to place
// env variables. We use ts-ignore because this line causes issues in the
// node/common js code of the vscode extension even though it's not used
// @ts-ignore
export let DEV_MODE = import.meta?.env?.MODE === "development" ?? false;
