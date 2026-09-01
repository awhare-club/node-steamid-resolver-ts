import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { resolveGroup } from './resolve.js';
import type { FullGroupInfo } from './types.js';

export function groupUrlToFullInfo(
  groupURL: string,
  callback?: CallbackFunction<FullGroupInfo>,
): Promise<FullGroupInfo> {
  return withCallback(() => resolveGroup(groupURL), callback);
}
