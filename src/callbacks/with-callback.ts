import type { CallbackFunction } from './types.js';

/**
 * Runs an async operation as a Promise, and also notifies a Node-style
 * callback when one is provided (legacy compatibility).
 */
export function withCallback<T>(
  operation: () => Promise<T>,
  callback?: CallbackFunction<T>,
): Promise<T> {
  const promise = operation();

  if (!callback) {
    return promise;
  }

  promise
    .then((result) => {
      callback(null, result);
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      callback(message, null);
    });

  // Swallow rejection so callback callers do not get UnhandledPromiseRejection.
  return promise.catch(() => undefined as T);
}
