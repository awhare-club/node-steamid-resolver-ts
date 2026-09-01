import {
  SteamAPIError,
  SteamEmptyResponseError,
} from '../steam-community/errors.js';
import { fetchSteamCommunityText } from '../steam-community/fetch-text.js';
import {
  isEmptyXmlBody,
  isSteamXmlDocument,
  parseSteamXml,
} from '../steam-community/parse-xml.js';
import {
  extractString,
  isEmptyResponse,
  isErrorResponse,
} from '../steam-community/xml-value.js';
import { SteamProfileNotFoundError } from './errors.js';
import { hasMinimalProfileData, isProfileResponse } from './guards.js';
import { restorePrivateCustomUrl } from './restore-custom-url.js';
import type { FullProfileInfo } from './types.js';
import { buildProfileUrl } from './url.js';

const PROFILE_NOT_FOUND_MARKERS = [
  'profile could not be found',
  'The specified profile could not be found',
  'Failed loading profile data',
];

function isProfileNotFoundMessage(message: string): boolean {
  return PROFILE_NOT_FOUND_MARKERS.some((marker) => message.includes(marker));
}

/** Load and validate a Steam profile document for any public lookup. */
export async function resolveProfile(
  identifier: string,
): Promise<FullProfileInfo> {
  const url = buildProfileUrl(identifier);
  const xml = await fetchSteamCommunityText(url);

  if (isEmptyXmlBody(xml)) {
    throw new SteamEmptyResponseError(identifier);
  }

  if (!isSteamXmlDocument(xml)) {
    throw new SteamProfileNotFoundError(identifier);
  }

  const parsed = await parseSteamXml(xml);

  if (isEmptyResponse(parsed)) {
    throw new SteamEmptyResponseError(identifier);
  }

  if (isErrorResponse(parsed)) {
    const message = extractString(parsed.response.error) || 'Unknown error';
    if (isProfileNotFoundMessage(message)) {
      throw new SteamProfileNotFoundError(identifier);
    }
    throw new SteamAPIError(message, 'PARSE_ERROR');
  }

  if (!isProfileResponse(parsed)) {
    throw new SteamProfileNotFoundError(identifier);
  }

  if (!hasMinimalProfileData(parsed.profile)) {
    throw new SteamAPIError('Profile missing required fields', 'PARSE_ERROR');
  }

  return restorePrivateCustomUrl(parsed.profile, url);
}
