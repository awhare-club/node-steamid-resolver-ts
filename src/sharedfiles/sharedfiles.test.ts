import { describe, expect, test } from 'bun:test';
import { isValidSharedfileID } from '../index.js';

const VALID_SHAREDFILE_ID = '2966606880';
const INVALID_SHAREDFILE_ID = '123';

describe('isValidSharedfileID', () => {
  test('accepts a valid sharedfile ID', async () => {
    expect(await isValidSharedfileID(VALID_SHAREDFILE_ID)).toBe(true);
  });

  test('accepts a full sharedfile URL', async () => {
    expect(
      await isValidSharedfileID(
        `https://steamcommunity.com/sharedfiles/filedetails/?id=${VALID_SHAREDFILE_ID}`,
      ),
    ).toBe(true);
  });

  test('rejects an invalid sharedfile ID', async () => {
    expect(await isValidSharedfileID(INVALID_SHAREDFILE_ID)).toBe(false);
  });

  test('supports the callback pattern', async () => {
    const result = await new Promise<boolean | null>((resolve, reject) => {
      isValidSharedfileID(VALID_SHAREDFILE_ID, (err, value) => {
        if (err) reject(new Error(err));
        else resolve(value);
      });
    });
    expect(result).toBe(true);
  });
});
