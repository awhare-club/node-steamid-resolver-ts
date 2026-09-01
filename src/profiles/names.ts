import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { SteamAPIError } from '../steam-community/errors.js';
import { extractString } from '../steam-community/xml-value.js';
import { resolveProfile } from './resolve.js';

export function steamID64ToProfileName(
  steamID64: string,
  callback?: CallbackFunction<string>,
): Promise<string> {
  return withCallback(async () => {
    const name = extractString((await resolveProfile(steamID64)).steamID);
    if (!name) {
      throw new SteamAPIError('Failed to resolve profile name', 'PARSE_ERROR');
    }
    return name;
  }, callback);
}

export function customUrlToProfileName(
  customURL: string,
  callback?: CallbackFunction<string>,
): Promise<string> {
  return withCallback(async () => {
    const name = extractString((await resolveProfile(customURL)).steamID);
    if (!name) {
      throw new SteamAPIError('Failed to resolve profile name', 'PARSE_ERROR');
    }
    return name;
  }, callback);
}
