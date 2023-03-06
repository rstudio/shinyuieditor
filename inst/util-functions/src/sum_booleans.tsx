/**
 * Count number of `true` booleans for a given list of them
 * @param all_bools Boolean variables to be counted
 * @returns number of booleans with value of `true` in arguments
 */
export function sum_booleans(...all_bools: boolean[]): number {
  let i = 0;

  for (const bool of all_bools) {
    if (bool) {
      i += 1;
    }
  }

  return i;
}
