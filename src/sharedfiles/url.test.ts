import { describe, expect, test } from 'bun:test';
import { buildSharedfileUrl } from './url.js';

describe('sharedfile URLs', () => {
  test('builds a filedetails URL from an ID', () => {
    expect(buildSharedfileUrl('2966606880')).toBe(
      'https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880',
    );
  });

  test('normalizes a full sharedfile URL', () => {
    expect(
      buildSharedfileUrl(
        'https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880&searchtext=',
      ),
    ).toBe('https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880');
  });
});
