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
