import { SiPython, SiR } from "react-icons/si";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/PopoverEl/FloatingPopover";
import { useLanguageMode } from "../state/languageMode";

import styles from "./LanguageModeBadge.module.css";

export function LanguageModeBadge() {
  const language = useLanguageMode();
  return (
    <Tooltip placement="bottom-start">
      <TooltipTrigger asChild>
        <div className={styles.language_badge}>
          {language === "PYTHON" ? (
            <SiPython height="100%" width="100%" />
          ) : (
            <SiR height="100%" width="100%" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Current language is {language === "PYTHON" ? "Python" : "R"}. Only
        supported ui elements for the language are shown.
      </TooltipContent>
    </Tooltip>
  );
}
