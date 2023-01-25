import React from "react";

export function DialogPopover({
  children,
  ...passthrough
}: React.ComponentPropsWithoutRef<"dialog">) {
  return (
    <dialog {...passthrough} ref={openDialog}>
      {children}
    </dialog>
  );
}

function openDialog(el: HTMLDialogElement | null) {
  if (el === null) return;

  try {
    el.showModal();
  } catch {}
}
