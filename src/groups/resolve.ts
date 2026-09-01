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
import { SteamGroupNotFoundError } from './errors.js';
import { isGroupResponse } from './guards.js';
import type { FullGroupInfo } from './types.js';
import { buildGroupUrl } from './url.js';

/** Load and validate a Steam group member-list document. */
export async function resolveGroup(identifier: string): Promise<FullGroupInfo> {
  const url = buildGroupUrl(identifier);
  const xml = await fetchSteamCommunityText(url);

  if (isEmptyXmlBody(xml)) {
    throw new SteamEmptyResponseError(identifier);
  }

  if (!isSteamXmlDocument(xml)) {
    throw new SteamGroupNotFoundError(identifier);
  }

  const parsed = await parseSteamXml(xml);

  if (isEmptyResponse(parsed)) {
    throw new SteamEmptyResponseError(identifier);
  }

  if (isErrorResponse(parsed)) {
    const message = extractString(parsed.response.error) || 'Unknown error';
    if (message.includes('group could not be found')) {
      throw new SteamGroupNotFoundError(identifier);
    }
    throw new SteamAPIError(message, 'PARSE_ERROR');
  }

  if (!isGroupResponse(parsed)) {
    throw new SteamGroupNotFoundError(identifier);
  }

  return parsed.memberList;
}
