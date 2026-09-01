import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { resolveProfile } from './resolve.js';
import type { FullProfileInfo } from './types.js';

export function steamID64ToFullInfo(
  steamID64: string,
  callback?: CallbackFunction<FullProfileInfo>,
): Promise<FullProfileInfo> {
  return withCallback(() => resolveProfile(steamID64), callback);
}

export function customUrlToFullInfo(
  customURL: string,
  callback?: CallbackFunction<FullProfileInfo>,
): Promise<FullProfileInfo> {
  return withCallback(() => resolveProfile(customURL), callback);
}
