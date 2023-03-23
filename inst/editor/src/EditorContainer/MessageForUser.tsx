import React from "react";

import styles from "./MessageForUser.module.css";

export function MessageForUser({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.message_for_user}>
      <div className={styles.message_container}>{children}</div>
    </div>
  );
}
export function ErrorMessagePrinter({ msg }: { msg: string }) {
  const msg_lines = msg.split("\n");

  return (
    <>
      {msg_lines.map((line) => (
        <p className={styles.error_msg}>{line}</p>
      ))}
    </>
  );
}
