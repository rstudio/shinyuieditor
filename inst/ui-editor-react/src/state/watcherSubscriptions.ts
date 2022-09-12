import type { StateUpdateSubscribers } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

function getUniqueSubscriptions<T extends keyof StateUpdateSubscribers>(
  type: T
): Set<StateUpdateSubscribers[T]> {
  const uniqueUpdateSubscribers = new Set<StateUpdateSubscribers[T]>();

  // Sometimes in a test environment we may not have loaded the node info module
  // so we need to exit early or get an error
  if (!shinyUiNodeInfo) return uniqueUpdateSubscribers;
  for (const info of Object.values(shinyUiNodeInfo)) {
    const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.[type];

    if (nodeUpdateSubscriber) {
      uniqueUpdateSubscribers.add(nodeUpdateSubscriber);
    }
  }

  return uniqueUpdateSubscribers;
}

// Gather subscriptions into a non-duplicated set
export const deleteSubscriptions = getUniqueSubscriptions("DELETE_NODE");

// Gather subscriptions into a non-duplicated set
export const updateSubscriptions = getUniqueSubscriptions("UPDATE_NODE");
