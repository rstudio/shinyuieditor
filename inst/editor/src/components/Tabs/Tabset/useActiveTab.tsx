import React from "react";

export function useActiveTab(numTabs: number, initalSelection: number = 0) {
  const [activeTab, setActiveTab] = React.useState<number>(initalSelection);

  React.useEffect(() => {
    if (numTabs <= activeTab) {
      // If we have a selected tab that is no longer present, delete it
      setActiveTab(numTabs - 1);
    }
  }, [activeTab, numTabs]);
  const setActiveTabVerified = (tabIndex: number) => {
    // if (numTabs <= tabIndex) {
    //   throw new Error(
    //     `Can't select tab that doesn't exist (${tabIndex}). Only ${numTabs} exist.`
    //   );
    // }
    setActiveTab(tabIndex);
  };

  return { activeTab, setActiveTab: setActiveTabVerified };
}
