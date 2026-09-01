import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { SteamAPIError } from '../steam-community/errors.js';
import { extractString } from '../steam-community/xml-value.js';
import { resolveGroup } from './resolve.js';

export function groupUrlToGroupID64(
  groupURL: string,
  callback?: CallbackFunction<string>,
): Promise<string> {
  return withCallback(async () => {
    const groupID64 = extractString((await resolveGroup(groupURL)).groupID64);
    if (!groupID64) {
      throw new SteamAPIError('Failed to resolve groupID64', 'PARSE_ERROR');
    }
    return groupID64;
  }, callback);
}
