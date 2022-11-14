import type React from "react";

export function validateRef<RefType>(
  x: React.RefObject<RefType | null>,
  error_msg: string = "Ref is not yet initialized"
): RefType {
  if (x.current === null) {
    throw new Error(error_msg);
  }
  return x.current;
}
