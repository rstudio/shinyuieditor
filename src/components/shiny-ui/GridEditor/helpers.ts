import { TractDirection } from "state-logic/gridLayout/atoms";

export const directions: TractDirection[] = ["rows", "cols"];
export function singular(dir: TractDirection): "row" | "column" {
  return dir === "rows" ? "row" : "column";
}
