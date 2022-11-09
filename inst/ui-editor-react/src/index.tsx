import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const dispatchMessage = runSUE({
  container,
  onMsg: (x) => console.log("Message to backend:", x),
});

setTimeout(() => {
  dispatchMessage({
    path: "APP-PREVIEW-READY",
    payload: "Address of app preview!",
  });
}, 2000);
