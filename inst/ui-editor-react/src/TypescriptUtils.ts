type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = Extract<
  T,
  Record<K, V>
>;
export type MapDiscriminatedUnion<
  T extends Record<K, string>,
  K extends keyof T
> = {
  [V in T[K]]: DiscriminateUnion<T, K, V>;
};

export type StringKeys<T extends Record<string, any>> = Extract<
  keyof T,
  string
>;
