type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = Extract<
  T,
  Record<K, V>
>;
export type MapDiscriminatedUnion<
  UnionType extends Record<KeyToMapFrom, string>,
  KeyToMapFrom extends keyof UnionType
> = {
  [MapKeyValue in UnionType[KeyToMapFrom]]: DiscriminateUnion<
    UnionType,
    KeyToMapFrom,
    MapKeyValue
  >;
};

export type StringKeys<T extends Record<string, any>> = Extract<
  keyof T,
  string
>;

export type PickKeyFn<Obj extends Record<string, any>> = (x: Obj) => keyof Obj;

export type NonOptionalKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];
export type OptionalKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? k : never;
}[keyof T];

export type Expect<T extends true> = T;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

// expands object types one level deep
export type Expand_Single<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

/** Doesn't expand into functions */
export type Expand<T> = T extends (...args: infer Args) => infer R
  ? (...args: Args) => R
  : T extends object
  ? T extends infer Obj
    ? { [Key in keyof Obj]: Expand<Obj[Key]> }
    : never
  : T;

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/** Convert a union type to a tupple that makes sure all elements are included
 * */
export type UnionToTuple<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToTuple<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

/**
 * Array of type that guarentees there's at least one element
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Typesafe no-op function
 * @param x
 * @returns
 */
export function identify_fn<T>(x: T) {
  return x;
}

/**
 * Get a union of all the keys of currently required values in the object along
 * with adding the newly requested keys
 */
type RequiredKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K;
}[keyof T];

/**
 * Set a subset of keys of an object to be required. Like a more specific
 * version of `Required<T>`
 */
export type RequireKeys<T, K extends keyof T> = Expand_Single<
  Required<Pick<T, RequiredKeys<T> | K>> & Omit<T, RequiredKeys<T> | K>
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type test_require_keys = Expect<
  Equal<
    RequireKeys<{ a: string; b?: number; c?: string[] }, "b">,
    { a: string; b: number; c?: string[] }
  >
>;
