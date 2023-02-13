import type { MessageToBackendByPath } from "./MessageToBackend";
import type { MessageToClientByPath } from "./MessageToClient";

export type MessageUnion<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> =
  | {
      [T in PathsWithPayload<MsgObj>]: {
        path: T;
        payload: MsgObj[T];
      };
    }[PathsWithPayload<MsgObj>]
  | {
      [T in PathsWithoutPayload<MsgObj>]: {
        path: T;
      };
    }[PathsWithoutPayload<MsgObj>];
// =============================================================================
// Helper generics to turn our simple message object type into unions that have
// smart payload slots
type PathsWithPayload<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? never : K;
}[keyof MsgObj];
type PathsWithoutPayload<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? K : never;
}[keyof MsgObj];
