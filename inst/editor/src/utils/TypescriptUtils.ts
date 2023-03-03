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
