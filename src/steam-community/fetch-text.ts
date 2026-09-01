import { SteamAPIError } from './errors.js';
import { withRetry } from './retry.js';

const USER_AGENT = 'Mozilla/5.0 (compatible; node-steamid-resolver-ts)';

async function getText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!response.ok) {
      throw new SteamAPIError(
        `HTTP ${response.status}: ${response.statusText}`,
        'NETWORK_ERROR',
      );
    }

    return await response.text();
  } catch (error) {
    if (error instanceof SteamAPIError) {
      throw error;
    }

    throw new SteamAPIError(
      `Failed to fetch data from Steam: ${error}`,
      'NETWORK_ERROR',
      error instanceof Error ? error : undefined,
    );
  }
}

/** Fetch a Steam Community URL as text, with retries. */
export function fetchSteamCommunityText(url: string): Promise<string> {
  return withRetry(() => getText(url));
}
