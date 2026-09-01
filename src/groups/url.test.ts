import { describe, expect, test } from 'bun:test';
import { buildGroupUrl } from './url.js';

describe('group URLs', () => {
  test('builds a members-list XML URL', () => {
    expect(buildGroupUrl('3urobeatGroup')).toBe(
      'https://steamcommunity.com/groups/3urobeatGroup/memberslistxml?xml=1',
    );
  });

  test('accepts a full group URL', () => {
    expect(
      buildGroupUrl('https://steamcommunity.com/groups/3urobeatGroup/'),
    ).toBe(
      'https://steamcommunity.com/groups/3urobeatGroup/memberslistxml?xml=1',
    );
  });
});
