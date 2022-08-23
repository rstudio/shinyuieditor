import React from "react";

export function useActiveTab(
  tabNames: string[],
  initalSelection: string = tabNames[0]
) {
  const [activeTab, setActiveTab] = React.useState<string>(initalSelection);

  const setActiveTabVerified = (tabName: string) => {
    if (!tabNames.includes(tabName)) {
      throw new Error(
        `Can't select tab that doesn't exist (${tabName}). Available names include ${tabNames.join(
          ","
        )}.`
      );
    }
    setActiveTab(tabName);
  };

  return { activeTab, setActiveTab: setActiveTabVerified };
}
