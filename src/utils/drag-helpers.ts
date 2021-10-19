function toggleTextSelection(type: "on" | "off") {
  // Turnoff text selection so dragging doesnt highlight a bunch of stuff
  const bodyClasses = document.querySelector("body")?.classList;
  if (type === "off") {
    bodyClasses?.add("disable-text-selection");
  } else {
    bodyClasses?.remove("disable-text-selection");
  }
}

export function setupClickAndDrag<StartFnArgs extends any[]>({
  onStart,
  onMove,
  onFinish,
}: {
  onStart: (...args: StartFnArgs) => void;
  onMove: (e: MouseEvent) => void;
  onFinish: (e: MouseEvent) => void;
}) {
  const onMouseUp = (e: MouseEvent) => {
    onFinish(e);
    toggleTextSelection("on");

    // Stop listening to the mouse move event after we're finished
    document.removeEventListener("mousemove", onMove);
  };

  return {
    onMouseDown: (...args: StartFnArgs) => {
      onStart(...args);
      toggleTextSelection("off");
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp, {
        once: true,
      });
    },
    cleanupFn: () => {
      document.removeEventListener("mousemove", onMove);
    },
  };
}
