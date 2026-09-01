import { describe, expect, test } from 'bun:test';
import { SteamAPIError } from '../steam-community/errors.js';
import { parseSteamCommunityIdentifier } from '../steam-community/steam-path.js';
import { buildProfileUrl, isSteamID64 } from './url.js';

describe('profile URLs', () => {
  test('detects steamID64 values', () => {
    expect(isSteamID64('76561198260031749')).toBe(true);
    expect(isSteamID64('3urobeat')).toBe(false);
  });

  test('builds XML URLs for IDs and custom names', () => {
    expect(buildProfileUrl('76561198260031749')).toBe(
      'https://steamcommunity.com/profiles/76561198260031749?xml=1',
    );
    expect(buildProfileUrl('3urobeat')).toBe(
      'https://steamcommunity.com/id/3urobeat?xml=1',
    );
  });

  test('strips a full community URL down to the identifier', () => {
    expect(
      parseSteamCommunityIdentifier('https://steamcommunity.com/id/3urobeat/'),
    ).toBe('3urobeat');
  });

  test('rejects an empty identifier', () => {
    expect(() => parseSteamCommunityIdentifier('')).toThrow(SteamAPIError);
  });
});
