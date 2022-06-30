import React from "react";

type WebsocketConnection =
  | {
      status: "connecting";
    }
  | { status: "connected"; ws: WebSocket }
  | { status: "failed-to-open" }
  | { status: "closed"; error_msg?: string };

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
