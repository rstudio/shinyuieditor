import React from "react";

export function DialogPopover({
  children,
  onClose,
  ...passthrough
}: Omit<React.ComponentPropsWithoutRef<"dialog">, "onClose"> & {
  onClose?: () => void;
}) {
  const dialog_ref = React.useRef<HTMLDialogElement>(null);
  // Enable closing via clicking outside modal if we've been passed an onClose
  // callback, indicating the user wants the modal to be closable
  React.useEffect(() => {
    if (!dialog_ref.current || typeof onClose === "undefined") return;

    const dialog = dialog_ref.current;
    function onClick(event: MouseEvent) {
      if (event.target === dialog) {
        onClose?.();
      }
    }
    dialog.addEventListener("click", onClick);

    try {
      dialog.showModal();
    } catch {}

    return () => {
      dialog.removeEventListener("click", onClick);
    };
  }, [onClose]);

  return (
    <dialog {...passthrough} ref={dialog_ref} onClose={onClose}>
      {children}
    </dialog>
  );
}
