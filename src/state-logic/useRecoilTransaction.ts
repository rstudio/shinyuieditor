import { useRecoilTransaction_UNSTABLE } from "recoil";

// Just a reexport of the transaction minus the _UNSTABLE part of the name
export const useRecoilTransaction = useRecoilTransaction_UNSTABLE;
