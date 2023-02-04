import { DependencyList, useCallback } from "react";
import { debounce } from "../utils/debounce.utils";

export function useDebounce<T extends Function>(
  callback: T,
  deps: DependencyList,
  waitFor: number
): T {
  return useCallback(debounce(callback, waitFor), [deps]);
}
