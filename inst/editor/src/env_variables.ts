// Put here so we're not tied to a given build tool's decision on where to place
// env variables.
// @ts-ignore
export let DEV_MODE = import.meta.env.MODE === "development";
