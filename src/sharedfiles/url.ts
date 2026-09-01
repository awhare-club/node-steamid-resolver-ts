import { parseSteamCommunityIdentifier } from '../steam-community/steam-path.js';

export function buildSharedfileUrl(sharedfileId: string): string {
  if (sharedfileId.includes('steamcommunity.com/sharedfiles/')) {
    const id = new URL(sharedfileId).searchParams.get('id');
    if (id) {
      return `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
    }
    return sharedfileId;
  }

  const id = parseSteamCommunityIdentifier(sharedfileId);
  return `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
}
