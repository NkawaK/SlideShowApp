import { wrapper } from "./fetchWrapper";

export const fetcher = <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => wrapper<T>(fetch(input, init));
