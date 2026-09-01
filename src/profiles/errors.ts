import { SteamAPIError } from '../steam-community/errors.js';

export class SteamProfileNotFoundError extends SteamAPIError {
  constructor(identifier: string) {
    super(
      `The specified profile could not be found: ${identifier}`,
      'PROFILE_NOT_FOUND',
    );
    this.name = 'SteamProfileNotFoundError';
  }
}

export class SteamPrivateProfileError extends SteamAPIError {
  constructor(identifier: string) {
    super(`The specified profile is private: ${identifier}`, 'PRIVATE_PROFILE');
    this.name = 'SteamPrivateProfileError';
  }
}
