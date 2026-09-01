export type SteamAPIErrorCode =
  | 'PROFILE_NOT_FOUND'
  | 'GROUP_NOT_FOUND'
  | 'PRIVATE_PROFILE'
  | 'NETWORK_ERROR'
  | 'PARSE_ERROR'
  | 'EMPTY_RESPONSE';

/** Base error for every Steam Community failure this library surfaces. */
export class SteamAPIError extends Error {
  constructor(
    message: string,
    public readonly code: SteamAPIErrorCode,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'SteamAPIError';
  }
}

/** Steam returned an empty body instead of profile or group XML. */
export class SteamEmptyResponseError extends SteamAPIError {
  constructor(identifier: string) {
    super(
      `Steam returned an empty response for: ${identifier}`,
      'EMPTY_RESPONSE',
    );
    this.name = 'SteamEmptyResponseError';
  }
}
