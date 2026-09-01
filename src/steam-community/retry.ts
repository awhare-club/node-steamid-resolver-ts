const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY_MS = 1000;

/** Retry a network operation with linear backoff. */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = DEFAULT_RETRIES,
  delayMs: number = DEFAULT_DELAY_MS,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === maxRetries) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError ?? new Error('Unknown error occurred');
}
