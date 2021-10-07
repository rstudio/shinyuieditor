import { GridLayoutTemplate } from "GridTypes";

type HistoryEntry = GridLayoutTemplate;
type EntryComparer = (a: HistoryEntry, b: HistoryEntry) => boolean;

export default class StateHistory {
  stack: HistoryEntry[];
  stepsBack: number;
  lastRequested: HistoryEntry | null;
  isSameFn: EntryComparer;

  constructor({ comparisonFn }: { comparisonFn: EntryComparer }) {
    this.stack = [];
    this.stepsBack = 0;
    this.lastRequested = null;
    this.isSameFn = comparisonFn;
  }

  isEntryFromHistory(entry: HistoryEntry) {
    if (!this.lastRequested) return false;
    return this.isSameFn(entry, this.lastRequested);
  }

  isDuplicateOfLastEntry(entry: HistoryEntry) {
    return this.isSameFn(entry, this.stack[this.stack.length - 1]);
  }

  startNewHistoryBranch() {
    this.stack = this.stack.slice(0, -this.stepsBack);
    this.stepsBack = 0;
  }

  addEntry(entry: HistoryEntry) {
    // We dont want to add anything to the history stack if we're looking at an
    // entry from the history itself (user has pressed back button etc) or if
    // the newest entry is the same as the last one (can happen on things like
    // page reloads).
    if (this.isEntryFromHistory(entry) || this.isDuplicateOfLastEntry(entry))
      return;

    if (this.stepsBack > 0) this.startNewHistoryBranch();

    // Add the latest entry to the history stack
    this.stack = [...this.stack, entry];
  }

  hasPreviousState() {
    if (this.stack.length === 1) return false;

    // Make sure we're not already at the start of the stack
    return this.stack.length - this.stepsBack > 1;
  }

  hasFutureState() {
    return this.stepsBack > 0;
  }

  getEntryFromHistory(steps: number) {
    this.stepsBack -= steps;
    const numSnapshots = this.stack.length;
    const newHistoryIndex = numSnapshots - this.stepsBack - 1;
    this.lastRequested = this.stack[newHistoryIndex];
    return this.lastRequested;
  }

  getPreviousEntry() {
    if (!this.hasPreviousState())
      throw new Error("Can't go backwards. At first entry in history");
    return this.getEntryFromHistory(-1);
  }

  getNextEntry() {
    if (!this.hasFutureState())
      throw new Error("Can't go forwards. At latest entry in history");
    return this.getEntryFromHistory(1);
  }
}

function sameLayout(
  a: GridLayoutTemplate,
  b: GridLayoutTemplate | null
): boolean {
  if (b === null) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}
