import { parseSteamCommunityIdentifier } from '../steam-community/steam-path.js';

export function buildGroupUrl(groupIdentifier: string): string {
  const id = parseSteamCommunityIdentifier(groupIdentifier);
  return `https://steamcommunity.com/groups/${id}/memberslistxml?xml=1`;
}
