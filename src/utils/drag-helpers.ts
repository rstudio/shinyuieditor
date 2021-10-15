export function toggleTextSelection(type: "on" | "off") {
  // Turnoff text selection so dragging doesnt highlight a bunch of stuff
  const bodyClasses = document.querySelector("body")?.classList;
  if (type === "off") {
    bodyClasses?.add("disable-text-selection");
  } else {
    bodyClasses?.remove("disable-text-selection");
  }
}

export function setupClickAndDrag({
  onStart,
  onMove,
  onFinish,
}: {
  onStart: Function;
  onMove: (e: MouseEvent) => void;
  onFinish: (e: MouseEvent) => void;
}) {
  const onMouseDown = (payload: any) => {
    onStart(payload);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onFinish, {
      once: true,
    });
  };

  const cleanupFn = () => {
    console.log("Cleaningup left over listeners from drag");
    document.addEventListener("mousemove", onMove);
  };

  return { onMouseDown, cleanupFn };
}
