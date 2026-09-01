import { parseStringPromise } from 'xml2js';

import { SteamAPIError } from './errors.js';
import type { RawSteamXml } from './types.js';

export function isSteamXmlDocument(xmlText: string): boolean {
  return (
    xmlText.includes('<?xml') ||
    xmlText.includes('<profile') ||
    xmlText.includes('<memberList')
  );
}

export function isEmptyXmlBody(xmlText: string): boolean {
  return !xmlText.trim() || xmlText.length < 10;
}

/** Parse Steam Community XML into the raw xml2js object graph. */
export async function parseSteamXml(xmlString: string): Promise<RawSteamXml> {
  try {
    return (await parseStringPromise(xmlString, {
      explicitArray: true,
      trim: true,
      normalize: true,
    })) as RawSteamXml;
  } catch (error) {
    throw new SteamAPIError(
      `XML parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      'PARSE_ERROR',
      error instanceof Error ? error : undefined,
    );
  }
}
