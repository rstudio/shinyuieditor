import { makeMessageDispatcherGeneric } from "communication-types/src/messageDispatcher";
import { vi } from "vitest";

type Payloads = {
  strings: string;
  numbers: number;
};

describe("Can subscribe and unsubscribe from messages", () => {
  const dispatch = makeMessageDispatcherGeneric<Payloads>();

  const stringsSubscriber = vi.fn();
  const numbersSubscriber = vi.fn();

  const stringsSubscription = dispatch.subscribe("strings", stringsSubscriber);
  const numbersSubscription = dispatch.subscribe("numbers", numbersSubscriber);

  test("Subscribers are called when dispatch is sent to them", () => {
    dispatch.dispatch("strings", "A");
    expect(stringsSubscriber).toHaveBeenCalledWith("A");

    dispatch.dispatch("numbers", 1);
    expect(numbersSubscriber).toHaveBeenCalledWith(1);
    expect(numbersSubscriber).toHaveBeenCalledTimes(1);

    dispatch.dispatch("numbers", 2);

    expect(numbersSubscriber).toHaveBeenCalledWith(2);
    expect(numbersSubscriber).toHaveBeenCalledTimes(2);
    expect(stringsSubscriber).toHaveBeenCalledTimes(1);
  });

  test("Subscribers can be unsubscribed", () => {
    stringsSubscription.unsubscribe();
    dispatch.dispatch("strings", "C");
    expect(stringsSubscriber).toHaveBeenCalledTimes(1);

    dispatch.dispatch("numbers", 3);

    expect(numbersSubscriber).toHaveBeenCalledWith(3);
    expect(numbersSubscriber).toHaveBeenCalledTimes(3);

    numbersSubscription.unsubscribe();
    dispatch.dispatch("numbers", 4);
    expect(numbersSubscriber).not.toHaveBeenCalledWith(4);
  });

  test("Unsubscribing something that already was doesn't cause issues", () => {
    expect(() => stringsSubscription.unsubscribe()).not.toThrow();
    expect(() => numbersSubscription.unsubscribe()).not.toThrow();
  });
});
