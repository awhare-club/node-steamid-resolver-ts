import { isRecord } from '../steam-community/xml-value.js';
import type { FullProfileInfo, MinimalSteamProfile } from './types.js';

export function isProfileResponse(
  data: unknown,
): data is { profile: FullProfileInfo } {
  return isRecord(data) && 'profile' in data;
}

export function hasMinimalProfileData(
  profile: unknown,
): profile is MinimalSteamProfile {
  if (!isRecord(profile)) {
    return false;
  }

  return (
    Array.isArray(profile.steamID64) &&
    Array.isArray(profile.steamID) &&
    Array.isArray(profile.onlineState) &&
    Array.isArray(profile.privacyState)
  );
}
