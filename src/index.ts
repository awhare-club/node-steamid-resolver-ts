/**
 * Steam ID Resolver
 *
 * Domain folders (`profiles`, `groups`, `sharedfiles`) are the public
 * capabilities. `steam-community` is the Steam Community XML transport.
 */

export {
  customUrlToSteamID64,
  steamID64ToCustomUrl,
} from './profiles/identifiers.js';
export {
  customUrlToProfileName,
  steamID64ToProfileName,
} from './profiles/names.js';
export { customUrlToFullInfo, steamID64ToFullInfo } from './profiles/info.js';

export { groupUrlToGroupID64 } from './groups/identifiers.js';
export { groupUrlToFullInfo } from './groups/info.js';

export { isValidSharedfileID } from './sharedfiles/is-valid-sharedfile-id.js';

export type { CallbackFunction } from './callbacks/types.js';
export type {
  ExtendedProfileFields,
  FullProfileInfo,
  MinimalSteamProfile,
} from './profiles/types.js';
export type { FullGroupInfo } from './groups/types.js';
export type {
  ResolverOptions,
  SteamXMLResponse,
} from './steam-community/types.js';

export {
  SteamAPIError,
  SteamEmptyResponseError,
} from './steam-community/errors.js';
export {
  SteamPrivateProfileError,
  SteamProfileNotFoundError,
} from './profiles/errors.js';
export { SteamGroupNotFoundError } from './groups/errors.js';
