/** Node-style callback used by the dual Promise/callback public API. */
export type CallbackFunction<T> = (
  err: string | null,
  result: T | null,
) => void;
