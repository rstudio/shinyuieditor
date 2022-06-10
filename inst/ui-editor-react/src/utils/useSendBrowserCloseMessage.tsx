import * as React from "react";

export function useSendBrowserCloseMessage() {
  React.useEffect(() => {
    window.addEventListener("beforeunload", tellServerAboutClose);
    return () =>
      window.removeEventListener("beforeunload", tellServerAboutClose);
  }, []);
}
function tellServerAboutClose() {
  fetch("browser-close", { method: "POST" }).catch((e) => {
    console.warn("Failed to send browser close to backend", e);
  });
}
