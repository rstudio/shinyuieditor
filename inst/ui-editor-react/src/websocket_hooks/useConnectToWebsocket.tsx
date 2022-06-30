import React from "react";

type WebsocketConnection =
  | { status: "connecting" }
  | { status: "connected"; ws: WebSocket }
  | { status: "failed-to-open" }
  | { status: "closed"; error_msg?: string };

export type WebsocketMessage = { msg: string; payload?: string | object };

export function useConnectToWebsocket() {
  const [connection, setConnection] = React.useState<WebsocketConnection>({
    status: "connecting",
  });
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
        setConnection({ status: "connected", ws });
      };

      ws.onclose = (event) => {
        if (haveConnectedToWebsocket.current) {
          setConnection({
            status: "closed",
            error_msg: "Error connecting to websocket",
          });
        } else {
          setConnection({ status: "failed-to-open" });
        }
        // Let state know that we've lost connection so we can alert the user
        console.warn("Lost connection to httpuv.");
      };

      ws.addEventListener("message", (e) => {
        console.log("Event from websocket", e);
      });

      return () => ws.close();
    } catch {
      console.warn(
        "Failure to initialize websocket at all. Probably on netlify"
      );
      setConnection({ status: "failed-to-open" });
    }
  }, []);

  return connection;
}

export const WebsocketContext = React.createContext<WebsocketConnection>({
  status: "connecting",
});

export const WebsocketProvider: React.FC = ({ children }) => {
  const wsConnection = useConnectToWebsocket();

  return (
    <WebsocketContext.Provider value={wsConnection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export type WebsocketCallbacks = {
  onConnected?: (sendMessage: (type: string, payload?: object) => void) => void;
  onClosed?: () => void;
  onFailedToOpen?: () => void;
};

export function useWebsocketConnection(
  callback_fns: WebsocketCallbacks,
  msg_listener?: (msg: WebsocketMessage) => void
) {
  const wsConnection = React.useContext(WebsocketContext);

  const listenForMessages = React.useCallback(
    (event: MessageEvent<any>) => {
      if (!msg_listener) return;
      const msg_data = JSON.parse(event.data) as WebsocketMessage;
      msg_listener(msg_data);
    },
    [msg_listener]
  );

  React.useEffect(() => {
    console.log("Container ws", wsConnection);

    switch (wsConnection.status) {
      case "connected":
        callback_fns.onConnected?.((type, payload) =>
          wsConnection.ws.send(makeWebsocketMessage(type, payload))
        );
        wsConnection.ws.addEventListener("message", listenForMessages);

        break;

      case "closed":
        callback_fns.onClosed?.();
        break;
      case "failed-to-open":
        callback_fns.onFailedToOpen?.();
        break;
    }
  }, [callback_fns, listenForMessages, wsConnection]);
}

function makeWebsocketMessage(type: string, payload?: object) {
  return new Blob([JSON.stringify({ type, payload }, null, 2)], {
    type: "application/json",
  });
}
