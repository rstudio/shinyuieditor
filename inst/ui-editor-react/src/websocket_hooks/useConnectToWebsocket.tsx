import React from "react";

type WebsocketConnection =
  | { status: "connecting"; ws: null; msg: null }
  | { status: "connected"; ws: WebSocket; msg: null }
  | { status: "failed-to-open"; ws: null; msg: null }
  | { status: "closed"; ws: null; msg: string };

export type WebsocketMessage = { path: string; payload?: string | object };

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
export function useConnectToWebsocket() {
  const [connection, setConnection] = React.useReducer(reducer, initial_state);

  const haveConnectedToWebsocket = React.useRef(false);

  React.useEffect(() => {
    if (!document.location.host) return;

    // If we're using the dev proxy we should just go straight to websocket.
    // Otherwise use the same location as the main app
    const websocket_host =
      process.env.NODE_ENV === "development"
        ? "localhost:8888"
        : window.location.host;

    try {
      const ws = new WebSocket(`ws://${websocket_host}`);

      ws.onerror = (e) => {
        console.error("Error with httpuv websocket connection", e);
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
        console.warn("Lost connection to httpuv.");
      };

      return () => ws.close();
    } catch {
      console.warn(
        "Failure to initialize websocket at all. Probably on netlify"
      );
      setConnection({ type: "FAILED" });
    }
  }, []);

  return connection;
}

export const WebsocketContext =
  React.createContext<WebsocketConnection>(initial_state);

export const WebsocketProvider: React.FC = ({ children }) => {
  const wsConnection = useConnectToWebsocket();

  return (
    <WebsocketContext.Provider value={wsConnection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export function useWebsocketBackend() {
  return React.useContext(WebsocketContext);
}

function parseWebsocketMessage(raw_msg: MessageEvent<any>) {
  return JSON.parse(raw_msg.data) as WebsocketMessage;
}

export function listenForWsMessages(
  ws: WebSocket,
  callbacks: (msg: WebsocketMessage) => void
) {
  ws.addEventListener("message", (event: MessageEvent<any>) => {
    callbacks(parseWebsocketMessage(event));
  });
}
