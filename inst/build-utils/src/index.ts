export function hasBooleanArg<ArgVals extends string>(prop: `--${ArgVals}`) {
  return process.argv.some((x) => x === prop);
}

export { buildCommand } from "./buildCommand";
export { serveCommand } from "./serveCommand";
