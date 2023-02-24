import * as React from "react";

import { useSelector } from "react-redux";

import PortalModal from "../components/PortalModal/PortalModal";
import type { RootState } from "../state/store";

export function LostConnectionPopup() {
  const connectedToServer = useSelector(
    (state: RootState) => state.connected_to_server
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
