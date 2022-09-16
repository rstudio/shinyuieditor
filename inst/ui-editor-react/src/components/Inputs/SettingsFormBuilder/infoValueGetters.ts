import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

type NodeToValueFn<T> = (node: ShinyUiNode) => T;

/**
 * Value is either type T or a callback that takes a ui node and returns type T
 */
export type ValOrNodeToTypeFn<T> = T | NodeToValueFn<T>;

function isNodeToValueFn<T>(x: ValOrNodeToTypeFn<T>): x is NodeToValueFn<T> {
  return typeof x === "function";
}

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
export type ArgumentsOrCallbacks<
  Obj extends Record<string, any>,
  NonDynamicKeys extends keyof any = never
> = {
  [Key in keyof Obj]: Key extends NonDynamicKeys
    ? Obj[Key]
    : ValOrNodeToTypeFn<Obj[Key]>;
};

/**
 *
 * @param x An argument value that is either the static value or a callback that
 * generates the value from the ui node the arguments are currently comming from
 * @param node Ui node corresponding to the uiArguments this property is working
 * with
 * @returns Either the value directly or the result of calling the dynamic
 * callback function
 */
export function getValueFromProperty<T>(
  x: ValOrNodeToTypeFn<T>,
  node: ShinyUiNode
): T {
  if (isNodeToValueFn(x)) {
    return x(node);
  }
  return x;
}

/**
 *
 * @param obj An object of either static values or callbacks that correspond to
 * values
 * @param node Ui node corresponding to the uiArguments the object is declaring
 * settings for
 * @returns The object with callbacks resolved to static values and static
 * values left unchanged
 */
export function getValuesFromProperties<Obj extends Record<string, any>>(
  obj: ArgumentsOrCallbacks<Obj>,
  node: ShinyUiNode
): Obj {
  const unpackedObj: Record<string, any> = {};

  for (const key in obj) {
    unpackedObj[key] = getValueFromProperty(obj[key], node);
  }

  return unpackedObj as Obj;
}
