import styles from "./style.module.css";

export function MutedText({
  children,
}: React.ComponentPropsWithoutRef<"span">) {
  return <span className={styles.muted_text}>{children}</span>;
}
