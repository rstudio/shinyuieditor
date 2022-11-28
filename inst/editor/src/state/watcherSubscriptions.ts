import type { StateUpdateSubscribers } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

function getUniqueSubscriptions<T extends keyof StateUpdateSubscribers>(
  type: T
): Set<StateUpdateSubscribers[T]> {
  const uniqueUpdateSubscribers = new Set<StateUpdateSubscribers[T]>();

  try {
    // Sometimes in a test/storybook environments we may not have loaded the
    // node info module so we need to watch out for this.
    for (const info of Object.values(shinyUiNodeInfo)) {
      const nodeUpdateSubscriber = info?.stateUpdateSubscribers?.[type];

      if (nodeUpdateSubscriber) {
        uniqueUpdateSubscribers.add(nodeUpdateSubscriber);
      }
    }
    return uniqueUpdateSubscribers;
  } catch {
    return uniqueUpdateSubscribers;
  }
}

// Gather subscriptions into a non-duplicated set
export const deleteSubscriptions = getUniqueSubscriptions("DELETE_NODE");

// Gather subscriptions into a non-duplicated set
export const updateSubscriptions = getUniqueSubscriptions("UPDATE_NODE");
