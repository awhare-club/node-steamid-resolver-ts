import type { SteamErrorResponse } from './types.js';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Steam XML fields arrive as single-element arrays from xml2js. */
export function extractString(
  value: [string] | string | undefined,
): string | undefined {
  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }
  if (typeof value === 'string') {
    return value;
  }
  return undefined;
}

export function isEmptyResponse(data: unknown): boolean {
  return !isRecord(data) || Object.keys(data).length === 0;
}

export function isErrorResponse(data: unknown): data is SteamErrorResponse {
  if (!isRecord(data) || !isRecord(data.response)) {
    return false;
  }
  return 'error' in data.response;
}
