import { all_node_info } from "../ui-node-definitions/uiNodeTypes";

import type { UpdateAction, DeleteAction } from "./app_info";

/**
 * Optional functions that will hook into the state update reducers and allow
 * a component the ability to respond to state manipulation before the main
 * tree update action has been preformed. These are dangerous and should only
 * be used as a last resort. perform state mutations in response in addition
 * to the plain updating of the node (which will occur last)
 */
type StateUpdateSubscribers = {
  UPDATE_NODE: UpdateAction;
  DELETE_NODE: DeleteAction;
};

/**
 * Generate a getter to lazily retreive update subscriptions from various nodes.
 * Lazy is important here because we don't have a guarentee about order of
 * assignment at the module scope so this will make sure that we get all
 * subscriptions because the node info objecst will be fully initialized
 * @param type Key of subscription type
 * @returns Function to lazy get a list of subscriptions.
 */
function createSubscriberGetter<T extends keyof StateUpdateSubscribers>(
  type: T
): () => Set<StateUpdateSubscribers[T]> {
  let subscriptions: Set<StateUpdateSubscribers[T]> | null = null;

  return () => {
    if (subscriptions !== null) return subscriptions;

    subscriptions = new Set<StateUpdateSubscribers[T]>();
    // Sometimes in a test/storybook environments we may not have loaded the
    // node info module so we need to watch out for this.
    for (const info of all_node_info) {
      if ("stateUpdateSubscribers" in info) {
        const nodeUpdateSubscriber = info.stateUpdateSubscribers?.[type];
        if (nodeUpdateSubscriber) {
          subscriptions.add(nodeUpdateSubscriber as StateUpdateSubscribers[T]);
        }
      }
    }
    return subscriptions;
  };
}

// Gather subscriptions into a non-duplicated set
export const get_deletion_subscriptions = createSubscriberGetter("DELETE_NODE");

export const get_update_subscriptions = createSubscriberGetter("UPDATE_NODE");
