import StateHistory from "modules/StateHistory";

test("Behaves as expected with nothing in it", () => {
  const hist = new StateHistory<string>({ comparisonFn: (a, b) => a === b });

  expect(hist.canGoBackwards()).toBe(false);
  expect(hist.canGoForwards()).toBe(false);
  expect(() => hist.getEntryFromHistory(-2)).toThrowError();
  expect(() => hist.getEntryFromHistory(2)).toThrowError();
  expect(() => hist.goBackwards()).toThrowError(
    "Can't go backwards. At first entry in history"
  );
  expect(() => hist.goForwards()).toThrowError(
    "Can't go forwards. At latest entry in history"
  );
});

test("Basic undo and redo works", () => {
  const hist = new StateHistory<number>({ comparisonFn: (a, b) => a === b });

  hist.addEntry(1);
  hist.addEntry(2);
  hist.addEntry(3);
  hist.addEntry(4);

  expect(hist.goBackwards()).toEqual(3);
  expect(hist.goBackwards()).toEqual(2);
  expect(hist.goBackwards()).toEqual(1);
  expect(hist.canGoBackwards()).toEqual(false);
  expect(hist.canGoForwards()).toEqual(true);

  expect(hist.goForwards()).toEqual(2);
  expect(hist.goForwards()).toEqual(3);
  expect(hist.goForwards()).toEqual(4);
  expect(hist.canGoBackwards()).toEqual(true);
  expect(hist.canGoForwards()).toEqual(false);
});

test("Adding a new entry while back in stack wipes out entries in front", () => {
  const hist = new StateHistory<string>({ comparisonFn: (a, b) => a === b });

  hist.addEntry("a");
  hist.addEntry("b");
  hist.addEntry("c");
  hist.addEntry("d");

  hist.goBackwards();
  hist.goBackwards();
  expect(hist.canGoForwards()).toEqual(true);
  expect(hist.stack).toStrictEqual(["a", "b", "c", "d"]);

  hist.addEntry("midStackChange");
  expect(hist.canGoForwards()).toEqual(false);
  expect(hist.stack).toStrictEqual(["a", "b", "midStackChange"]);
});

test("Won't add back-to-back duplicate entries", () => {
  const hist = new StateHistory<string>({ comparisonFn: (a, b) => a === b });

  hist.addEntry("a");
  hist.addEntry("b");
  hist.addEntry("b");
  hist.addEntry("c");
  hist.addEntry("b");

  expect(hist.stack).toStrictEqual(["a", "b", "c", "b"]);
});
