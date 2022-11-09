import React from "react";

import { buildWebsocketPath } from "./buildWebsocketPath";

export type BackendMessage = { path: string; payload?: string | object };

type WebsocketConnection =
  | { status: "connecting"; ws: null; msg: null }
  | { status: "connected"; ws: WebSocket; msg: null }
  | { status: "failed-to-open"; ws: null; msg: null }
  | { status: "closed"; ws: null; msg: string };

type ConnectionAction =
  | {
      type: "CONNECTED";
      ws: WebSocket;
    }
  | {
      type: "FAILED";
    }
  | {
      type: "CLOSED";
      msg: string;
    };

const null_state = { ws: null, msg: null };
const initial_state: WebsocketConnection = {
  ...null_state,
  status: "connecting",
};
function reducer(
  state: WebsocketConnection,
  action: ConnectionAction
): WebsocketConnection {
  switch (action.type) {
    case "CONNECTED":
      return { ...null_state, status: "connected", ws: action.ws };
    case "FAILED":
      return { ...null_state, status: "failed-to-open" };
    case "CLOSED":
      return { ...null_state, status: "closed", msg: action.msg };
    default:
      throw new Error("Unknown action");
  }
}

function useConnectToWebsocket() {
  const [connection, setConnection] = React.useReducer(reducer, initial_state);

  const haveConnectedToWebsocket = React.useRef(false);

  React.useEffect(() => {
    try {
      if (!document.location.host) throw new Error("Not on a served site!");

      const websocket_path = buildWebsocketPath();

      const ws = new WebSocket(websocket_path);

      ws.onerror = (e) => {
        // eslint-disable-next-line no-console
        console.error("Error with httpuv websocket connection", e);
        setConnection({ type: "FAILED" });
      };

      ws.onopen = (event) => {
        // console.log("Websocket successfully opened with httpuv");
        haveConnectedToWebsocket.current = true;
        setConnection({ type: "CONNECTED", ws });
      };

      ws.onclose = (event) => {
        if (haveConnectedToWebsocket.current) {
          setConnection({
            type: "CLOSED",
            msg: "Error connecting to websocket",
          });
        } else {
          setConnection({ type: "FAILED" });
        }
        // Let state know that we've lost connection so we can alert the user
        // eslint-disable-next-line no-console
        console.warn("Lost connection to httpuv.");
      };

      return () => ws.close();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        "Failure to initialize websocket at all. Probably on netlify",
        e
      );
      setConnection({ type: "FAILED" });
    }
  }, []);

  return connection;
}

const WebsocketContext =
  React.createContext<WebsocketConnection>(initial_state);

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const wsConnection = useConnectToWebsocket();

  return (
    <WebsocketContext.Provider value={wsConnection}>
      {children}
    </WebsocketContext.Provider>
  );
}

export function useWebsocketBackend() {
  return React.useContext(WebsocketContext);
}

function parseWebsocketMessage(raw_msg: MessageEvent<any>) {
  return JSON.parse(raw_msg.data) as BackendMessage;
}

export function listenForWsMessages(
  ws: WebSocket,
  callbacks: (msg: BackendMessage) => void
) {
  ws.addEventListener("message", (event: MessageEvent<any>) => {
    callbacks(parseWebsocketMessage(event));
  });
}
