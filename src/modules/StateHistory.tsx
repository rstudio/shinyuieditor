import { GridLayoutTemplate } from "GridTypes";

export type StateHistory = {
  stack: GridLayoutTemplate[];
  stepsBack: number;
  lastRequested: GridLayoutTemplate | null;
};
export const stateHistoryInit: StateHistory = {
  stack: [],
  stepsBack: 0,
  lastRequested: null,
};

function isEntryFromHistory(
  currentLayout: GridLayoutTemplate,
  history: StateHistory
) {
  return sameLayout(currentLayout, history.lastRequested);
}
function isDuplicateOfLastEntry(
  currentLayout: GridLayoutTemplate,
  history: StateHistory
) {
  return sameLayout(currentLayout, history.stack[history.stack.length - 1]);
}

function isEmptyTemplate(template?: GridLayoutTemplate) {
  if (typeof template === "undefined") return true;
  const { rows, cols, items } = template;
  return rows.length === 0 && cols.length === 0 && items.length === 0;
}

export function addEntry(
  currentLayout: GridLayoutTemplate,
  history: StateHistory
) {
  // We dont want to add anything to the history stack if the current layout
  // is empty (aka initialization), or we're looking at an entry from the
  // history itself (user has pressed back button etc) or if the newest entry
  // is the same as the last one (can happen on things like page reloads).
  if (
    isEmptyTemplate(currentLayout) ||
    isEntryFromHistory(currentLayout, history) ||
    isDuplicateOfLastEntry(currentLayout, history)
  )
    return;

  if (history.stepsBack > 0) startNewHistoryBranch(history);

  // Add the latest entry to the history stack
  history.stack = [...history.stack, currentLayout];
}

export function sameLayout(
  a: GridLayoutTemplate,
  b: GridLayoutTemplate | null
): boolean {
  if (b === null) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}

export function getEntryFromHistory(history: StateHistory, steps: number) {
  history.stepsBack -= steps;
  const numSnapshots = history.stack.length;
  const newHistoryIndex = numSnapshots - history.stepsBack - 1;
  history.lastRequested = history.stack[newHistoryIndex];
  return history.lastRequested;
}

export function startNewHistoryBranch(history: StateHistory) {
  history.stack = history.stack.slice(0, -history.stepsBack);
  history.stepsBack = 0;
}

export function hasPreviousState(history: StateHistory) {
  if (history.stack.length === 1) return false;

  // Make sure we're not already at the start of the stack
  return history.stack.length - history.stepsBack > 1;
}
export function hasFutureState(history: StateHistory) {
  return history.stepsBack > 0;
}
