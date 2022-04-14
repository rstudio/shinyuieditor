/**
 * Get union of all values on object. Partner to keyof
 */
export type ValueOf<T> = T[keyof T];
