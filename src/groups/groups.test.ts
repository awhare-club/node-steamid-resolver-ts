import { describe, expect, test } from 'bun:test';
import {
  groupUrlToFullInfo,
  groupUrlToGroupID64,
  SteamGroupNotFoundError,
} from '../index.js';

const VALID_GROUP_URL = '3urobeatGroup';
const VALID_GROUP_ID64 = '103582791464712227';
const INVALID_GROUP_URL = 'thisgroupdoesnotexist123456789';

describe('groupUrlToGroupID64', () => {
  test('converts a valid group URL to groupID64', async () => {
    expect(await groupUrlToGroupID64(VALID_GROUP_URL)).toBe(VALID_GROUP_ID64);
  });

  test('accepts a full group URL', async () => {
    expect(
      await groupUrlToGroupID64(
        `https://steamcommunity.com/groups/${VALID_GROUP_URL}`,
      ),
    ).toBe(VALID_GROUP_ID64);
  });

  test('throws for an invalid group URL', async () => {
    await expect(groupUrlToGroupID64(INVALID_GROUP_URL)).rejects.toThrow(
      SteamGroupNotFoundError,
    );
  });
});

describe('groupUrlToFullInfo', () => {
  test('returns required group fields', async () => {
    const result = await groupUrlToFullInfo(VALID_GROUP_URL);
    expect(result.groupID64[0]).toBe(VALID_GROUP_ID64);
    expect(Array.isArray(result.groupDetails)).toBe(true);
  });

  test('throws for an invalid group URL', async () => {
    await expect(groupUrlToFullInfo(INVALID_GROUP_URL)).rejects.toThrow(
      SteamGroupNotFoundError,
    );
  });
});
