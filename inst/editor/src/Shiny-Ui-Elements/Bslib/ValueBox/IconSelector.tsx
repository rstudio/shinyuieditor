import { useState } from "react";

import allBsIconNames from "../../../assets/bsicons/all-bsicon-names.json";
import { mergeClasses } from "../../../utils/mergeClasses";

import { BsIcon } from "./BsIcon";
import styles from "./IconSelector.module.css";

export function IconSelector({
  onIconSelect,
}: {
  onIconSelect: (icon: string) => void;
}) {
  const [search, setSearch] = useState<string>("");
  const icons: string[] = allBsIconNames;
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    onIconSelect(icon);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search icons"
      />
      <div className={styles.icon_list}>
        {filteredIcons.map((icon) => (
          <div
            key={icon}
            className={mergeClasses(
              styles.icon_preview,
              selectedIcon === icon ? styles.selected : null
            )}
            onClick={() => handleIconClick(icon)}
          >
            <BsIcon icon_name={icon} />
            <span>{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
