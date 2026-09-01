import { describe, expect, test } from 'bun:test';
import {
  customUrlToFullInfo,
  customUrlToProfileName,
  customUrlToSteamID64,
  SteamAPIError,
  steamID64ToCustomUrl,
  steamID64ToFullInfo,
  steamID64ToProfileName,
  SteamProfileNotFoundError,
} from '../index.js';

const VALID_STEAM_ID64 = '76561198260031749';
const VALID_CUSTOM_URL = '3urobeat';
const PRIVATE_STEAM_ID64 = '76561199106614750';
const INVALID_STEAM_ID64 = '86561198260031749';
const INVALID_CUSTOM_URL = 'thisuserdoesnotexist123456789';

describe('steamID64ToCustomUrl', () => {
  test('converts a valid steamID64 to customURL', async () => {
    const result = await steamID64ToCustomUrl(VALID_STEAM_ID64);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('accepts a full profile URL', async () => {
    const result = await steamID64ToCustomUrl(
      `https://steamcommunity.com/profiles/${VALID_STEAM_ID64}`,
    );
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('throws for an invalid steamID64', async () => {
    await expect(steamID64ToCustomUrl(INVALID_STEAM_ID64)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });

  test('supports the callback pattern', async () => {
    const result = await new Promise<string | null>((resolve, reject) => {
      steamID64ToCustomUrl(VALID_STEAM_ID64, (err, value) => {
        if (err) reject(new Error(err));
        else resolve(value);
      });
    });
    expect(typeof result).toBe('string');
    expect(result?.length).toBeGreaterThan(0);
  });

  test('reports callback errors', async () => {
    const { err, result } = await new Promise<{
      err: string | null;
      result: string | null;
    }>((resolve) => {
      steamID64ToCustomUrl(INVALID_STEAM_ID64, (error, value) => {
        resolve({ err: error, result: value });
      });
    });
    expect(err).toBeTruthy();
    expect(result).toBeNull();
  });
});

describe('customUrlToSteamID64', () => {
  test('converts a valid customURL to steamID64', async () => {
    expect(await customUrlToSteamID64(VALID_CUSTOM_URL)).toBe(VALID_STEAM_ID64);
  });

  test('accepts a full profile URL', async () => {
    expect(
      await customUrlToSteamID64(
        `https://steamcommunity.com/id/${VALID_CUSTOM_URL}`,
      ),
    ).toBe(VALID_STEAM_ID64);
  });

  test('throws for an invalid customURL', async () => {
    await expect(customUrlToSteamID64(INVALID_CUSTOM_URL)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });
});

describe('steamID64ToProfileName', () => {
  test('resolves a display name', async () => {
    const result = await steamID64ToProfileName(VALID_STEAM_ID64);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('throws for an invalid steamID64', async () => {
    await expect(steamID64ToProfileName(INVALID_STEAM_ID64)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });
});

describe('customUrlToProfileName', () => {
  test('resolves a display name', async () => {
    const result = await customUrlToProfileName(VALID_CUSTOM_URL);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('throws for an invalid customURL', async () => {
    await expect(customUrlToProfileName(INVALID_CUSTOM_URL)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });
});

describe('steamID64ToFullInfo', () => {
  test('returns required profile fields', async () => {
    const result = await steamID64ToFullInfo(VALID_STEAM_ID64);

    expect(result.steamID64[0]).toBe(VALID_STEAM_ID64);
    expect(Array.isArray(result.steamID)).toBe(true);
    expect(Array.isArray(result.onlineState)).toBe(true);
    expect(Array.isArray(result.privacyState)).toBe(true);
  });

  test('handles any privacy state', async () => {
    const result = await steamID64ToFullInfo(PRIVATE_STEAM_ID64);
    expect(result.steamID64).toBeDefined();
    expect(['public', 'private', 'friendsonly']).toContain(
      result.privacyState[0],
    );
  });

  test('throws for an invalid steamID64', async () => {
    await expect(steamID64ToFullInfo(INVALID_STEAM_ID64)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });
});

describe('customUrlToFullInfo', () => {
  test('returns full profile information', async () => {
    const result = await customUrlToFullInfo(VALID_CUSTOM_URL);
    expect(result.steamID64[0]).toBe(VALID_STEAM_ID64);
    expect(result.customURL).toBeDefined();
  });

  test('throws for an invalid customURL', async () => {
    await expect(customUrlToFullInfo(INVALID_CUSTOM_URL)).rejects.toThrow(
      SteamProfileNotFoundError,
    );
  });
});

describe('profile errors', () => {
  test('preserves error types', async () => {
    try {
      await steamID64ToCustomUrl(INVALID_STEAM_ID64);
      throw new Error('expected lookup to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(SteamProfileNotFoundError);
      expect(error).toBeInstanceOf(SteamAPIError);
    }
  });

  test('rejects empty or malformed identifiers', async () => {
    await expect(steamID64ToCustomUrl('')).rejects.toThrow();
    await expect(steamID64ToCustomUrl('invalid-format')).rejects.toThrow();
  });
});

describe('profile request behavior', () => {
  test('handles concurrent lookups', async () => {
    const results = await Promise.all(
      Array.from({ length: 5 }, () => steamID64ToCustomUrl(VALID_STEAM_ID64)),
    );
    expect(results).toHaveLength(5);
    for (const result of results) {
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test('completes within a reasonable time', async () => {
    const started = Date.now();
    await steamID64ToCustomUrl(VALID_STEAM_ID64);
    expect(Date.now() - started).toBeLessThan(10000);
  });
});
