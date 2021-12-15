import * as React from "react";
import { diff } from "just-diff";

export function prettyJSON(x: object) {
  return JSON.stringify(x, null, 2);
}
// Hook to observe and explain changes to a changing object
export function useShowDiffs({
  val: currVal,
  onUpdate = (x) => console.log(prettyJSON(x)),
}: {
  val: object;
  onUpdate?: (res: { currVal: object; diff: ReturnType<typeof diff> }) => void;
}) {
  // Setup a ref to persist the previous value between useEffect triggers
  const previousVal = React.useRef(currVal);

  // When there's an update to the object...
  React.useEffect(() => {
    // Calculate diffs and send to callback along with the new value
    onUpdate({ diff: diff(previousVal.current, currVal), currVal });

    // Get ready for next change by updating ref
    previousVal.current = currVal;
  }, [onUpdate, currVal]);
}
