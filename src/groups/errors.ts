import { SteamAPIError } from '../steam-community/errors.js';

export class SteamGroupNotFoundError extends SteamAPIError {
  constructor(identifier: string) {
    super(
      `The specified group could not be found: ${identifier}`,
      'GROUP_NOT_FOUND',
    );
    this.name = 'SteamGroupNotFoundError';
  }
}
