import { vi } from "vitest";

import { makeMessageDispatcher } from "./messageDispatcher";

describe("Can subscribe and unsubscribe from messages", () => {
  const dispatch = makeMessageDispatcher();

  const appPreviewLogsSubscriber = vi.fn();
  const parsingErrorSubscriber = vi.fn();

  const previewLogsSubscription = dispatch.subscribe(
    "APP-PREVIEW-LOGS",
    appPreviewLogsSubscriber
  );
  const parsingErrorSubscription = dispatch.subscribe(
    "PARSING-ERROR",
    parsingErrorSubscriber
  );

  test("Subscribers are called when dispatch is sent to them", () => {
    dispatch.dispatch({ path: "APP-PREVIEW-LOGS", payload: ["A", "B"] });
    expect(appPreviewLogsSubscriber).toHaveBeenCalledWith(["A", "B"]);

    dispatch.dispatch({
      path: "PARSING-ERROR",
      payload: "Err Msg A",
    });
    expect(parsingErrorSubscriber).toHaveBeenCalledWith("Err Msg A");
    expect(parsingErrorSubscriber).toHaveBeenCalledTimes(1);

    dispatch.dispatch({
      path: "PARSING-ERROR",
      payload: "Err Msg B",
    });

    expect(parsingErrorSubscriber).toHaveBeenCalledWith("Err Msg B");
    expect(parsingErrorSubscriber).toHaveBeenCalledTimes(2);
    expect(appPreviewLogsSubscriber).toHaveBeenCalledTimes(1);
  });

  test("Subscribers can be unsubscribed", () => {
    previewLogsSubscription.unsubscribe();
    dispatch.dispatch({ path: "APP-PREVIEW-LOGS", payload: ["C", "D"] });
    expect(appPreviewLogsSubscriber).toHaveBeenCalledTimes(1);

    dispatch.dispatch({
      path: "PARSING-ERROR",
      payload: "Err Msg C",
    });

    expect(parsingErrorSubscriber).toHaveBeenCalledWith("Err Msg C");
    expect(parsingErrorSubscriber).toHaveBeenCalledTimes(3);

    parsingErrorSubscription.unsubscribe();
    dispatch.dispatch({
      path: "PARSING-ERROR",
      payload: "Err Msg D",
    });
    expect(parsingErrorSubscriber).not.toHaveBeenCalledWith("Err Msg D");
  });
});
