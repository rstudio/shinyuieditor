// Some helper generics to make it easier to type out functions for pulling
// updating logic out of callbacks etc..

import { RecoilValue, RecoilState } from "recoil";

export type RecoilGetter<T> = (a: RecoilValue<T>) => T;
export type RecoilSetter<T> = (s: RecoilState<T>, u: T) => void;
