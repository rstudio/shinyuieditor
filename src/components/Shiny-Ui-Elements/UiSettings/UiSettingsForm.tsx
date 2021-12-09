import { Button } from "@chakra-ui/react";
import React from "react";
import { BiCheck } from "react-icons/bi";

/**
 * Wraps a series of state-controlled inputs in a form that can be submitted
 * with a standard submission UI. Should be used in all UISettingsComponents.
 */
export default function UiSettingsForm({
  children,
  onUpdate,
}: {
  children: React.ReactNode;
  onUpdate: () => void;
}) {
  return (
    <div css={{ padding: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate();
        }}
      >
        {children}
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
}
