import { SteamAPIError } from './errors.js';

/** Last path segment of a steamcommunity.com URL, or the raw identifier. */
export function parseSteamCommunityIdentifier(value: string): string {
  if (!value) {
    throw new SteamAPIError(
      'Parameter must be a non-empty string',
      'PARSE_ERROR',
    );
  }

  if (!value.includes('steamcommunity.com/')) {
    return value.trim();
  }

  const segments = value.split('/');
  if (segments.at(-1) === '') {
    segments.pop();
  }

  return segments.at(-1) ?? '';
}
