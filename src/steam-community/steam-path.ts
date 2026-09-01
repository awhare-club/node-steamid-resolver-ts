import { SteamAPIError } from './errors.js';

/** Last path segment of a steamcommunity.com URL, or the raw identifier. */
export function parseSteamCommunityIdentifier(value: string): string {
  if (!value) {
    throw new SteamAPIError(
      'Parameter must be a non-empty string',
      'PARSE_ERROR',
    );
  }

  const trimmedValue = value.trim();

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedValue);
  } catch {
    return trimmedValue;
  }

  const host = parsedUrl.hostname.toLowerCase();
  if (host !== 'steamcommunity.com' && !host.endsWith('.steamcommunity.com')) {
    return trimmedValue;
  }

  const segments = parsedUrl.pathname.split('/').filter(Boolean);
  return segments.at(-1) ?? '';
}
