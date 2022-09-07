import type { StateUpdateSubscribers } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

function getUniqueSubscriptions<T extends keyof StateUpdateSubscribers>(
  type: T
): Set<StateUpdateSubscribers[T]> {
  const uniqueUpdateSubscribers = new Set<StateUpdateSubscribers[T]>();

  for (const info of Object.values(shinyUiNodeInfo)) {
    const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.[type];

    if (nodeUpdateSubscriber !== undefined) {
      uniqueUpdateSubscribers.add(nodeUpdateSubscriber);
    }
  }

  return uniqueUpdateSubscribers;
}

// Gather subscriptions into a non-duplicated set
export const deleteSubscriptions = getUniqueSubscriptions("DELETE_NODE");

// Gather subscriptions into a non-duplicated set
export const updateSubscriptions = getUniqueSubscriptions("UPDATE_NODE");
