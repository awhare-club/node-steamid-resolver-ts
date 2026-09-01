import { parseSteamCommunityIdentifier } from '../steam-community/steam-path.js';

const STEAM_ID64 = /^765611\d{11}$/;

export function isSteamID64(value: string): boolean {
  return STEAM_ID64.test(value);
}

export function buildProfileUrl(identifier: string): string {
  const id = parseSteamCommunityIdentifier(identifier);
  const path = isSteamID64(id) ? 'profiles' : 'id';
  return `https://steamcommunity.com/${path}/${id}?xml=1`;
}
