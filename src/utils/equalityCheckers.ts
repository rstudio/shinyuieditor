export function sameArray<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

type Obj = { [key: string]: any };

export function sameObject(
  a: Obj,
  b: Obj,
  ignoredKeys: string[] | string = []
) {
  const aKeys = Object.keys(a).filter((key) => !ignoredKeys.includes(key));
  const bKeys = Object.keys(b).filter((key) => !ignoredKeys.includes(key));
  if (!sameArray(aKeys, bKeys)) return false;

  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}

function omit(obj: Obj, keysToRemove: string[] | string): Obj {
  const result: Obj = {};
  if (typeof keysToRemove === "string") {
    keysToRemove = [].slice.call(arguments, 1);
  }
  for (let prop in obj) {
    if (!obj.hasOwnProperty || obj.hasOwnProperty(prop)) {
      if (!keysToRemove.includes(prop)) {
        result[prop] = obj[prop];
      }
    }
  }
  return result;
}
