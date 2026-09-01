import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { SteamAPIError } from '../steam-community/errors.js';
import { extractString } from '../steam-community/xml-value.js';
import { resolveProfile } from './resolve.js';

export function steamID64ToCustomUrl(
  steamID64: string,
  callback?: CallbackFunction<string>,
): Promise<string> {
  return withCallback(async () => {
    const customURL = extractString(
      (await resolveProfile(steamID64)).customURL,
    );
    if (!customURL) {
      throw new SteamAPIError('Failed to resolve customURL', 'PARSE_ERROR');
    }
    return customURL;
  }, callback);
}

export function customUrlToSteamID64(
  customURL: string,
  callback?: CallbackFunction<string>,
): Promise<string> {
  return withCallback(async () => {
    const steamID64 = extractString(
      (await resolveProfile(customURL)).steamID64,
    );
    if (!steamID64) {
      throw new SteamAPIError('Failed to resolve steamID64', 'PARSE_ERROR');
    }
    return steamID64;
  }, callback);
}
