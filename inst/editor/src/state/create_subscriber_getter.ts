import type { StateUpdateSubscribers } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfoArray } from "../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Generate a getter to lazily retreive update subscriptions from various nodes.
 * Lazy is important here because we don't have a guarentee about order of
 * assignment at the module scope so this will make sure that we get all
 * subscriptions because the node info objecst will be fully initialized
 * @param type Key of subscription type
 * @returns Function to lazy get a list of subscriptions.
 */
function create_subscriber_getter<T extends keyof StateUpdateSubscribers>(
  type: T
): () => Set<StateUpdateSubscribers[T]> {
  let subscriptions: Set<StateUpdateSubscribers[T]> | null = null;

  return () => {
    if (subscriptions !== null) return subscriptions;

    subscriptions = new Set<StateUpdateSubscribers[T]>();
    // Sometimes in a test/storybook environments we may not have loaded the
    // node info module so we need to watch out for this.
    for (const info of shinyUiNodeInfoArray) {
      if ("stateUpdateSubscribers" in info) {
        const nodeUpdateSubscriber = info.stateUpdateSubscribers?.[type];
        if (nodeUpdateSubscriber) {
          subscriptions.add(nodeUpdateSubscriber);
        }
      }
    }
    return subscriptions;
  };
}

// Gather subscriptions into a non-duplicated set
export const get_deletion_subscriptions =
  create_subscriber_getter("DELETE_NODE");

export const get_update_subscriptions = create_subscriber_getter("UPDATE_NODE");
