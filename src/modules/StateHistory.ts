export default class StateHistory<EntryType> {
  stack: EntryType[];
  stepsBack: number;
  private lastRequested: EntryType | null;
  private isSameFn: (a: EntryType, b: EntryType) => boolean;

  constructor({
    comparisonFn,
  }: {
    comparisonFn: (a: EntryType, b: EntryType) => boolean;
  }) {
    this.stack = [];
    this.stepsBack = 0;
    this.lastRequested = null;
    this.isSameFn = comparisonFn;
  }

  private isEntryFromHistory(entry: EntryType) {
    if (!this.lastRequested) return false;
    return this.isSameFn(entry, this.lastRequested);
  }

  private isDuplicateOfLastEntry(entry: EntryType) {
    return this.isSameFn(entry, this.stack[this.stack.length - 1]);
  }

  private startNewHistoryBranch() {
    this.stack = this.stack.slice(0, -this.stepsBack);
    this.stepsBack = 0;
  }

  addEntry(entry: EntryType) {
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

  canGoBackwards() {
    if (this.stack.length === 1) return false;

    // Make sure we're not already at the start of the stack
    return this.stack.length - this.stepsBack > 1;
  }

  canGoForwards() {
    return this.stepsBack > 0;
  }

  getEntryFromHistory(steps: number) {
    this.stepsBack -= steps;
    const numSnapshots = this.stack.length;
    const newHistoryIndex = numSnapshots - this.stepsBack - 1;

    if (newHistoryIndex < 0) {
      throw new Error("Requested history entry too far backwards.");
    } else if (newHistoryIndex > numSnapshots) {
      throw new Error(
        `Not enough entries in history to go ${steps} steps forward`
      );
    }
    this.lastRequested = this.stack[newHistoryIndex];
    return this.lastRequested;
  }

  goBackwards() {
    if (!this.canGoBackwards())
      throw new Error("Can't go backwards. At first entry in history");
    return this.getEntryFromHistory(-1);
  }

  goForwards() {
    if (!this.canGoForwards())
      throw new Error("Can't go forwards. At latest entry in history");
    return this.getEntryFromHistory(1);
  }
}
