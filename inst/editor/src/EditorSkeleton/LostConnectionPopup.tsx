import * as React from "react";

import PortalModal from "PortalModal";
import { useSelector } from "react-redux";
import type { RootState } from "state/store";

export function LostConnectionPopup() {
  const connectedToServer = useSelector(
    (state: RootState) => state.connectedToServer
  );

  if (connectedToServer) return null;

  return (
    <PortalModal onConfirm={() => {}} onCancel={() => {}}>
      <p style={{ color: "var(--red, pink)", textAlign: "center" }}>
        Lost connection to backend. Check console where editor was launched for
        details.
      </p>
    </PortalModal>
  );
}
