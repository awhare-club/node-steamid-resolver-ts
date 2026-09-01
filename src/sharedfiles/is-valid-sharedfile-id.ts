import type { CallbackFunction } from '../callbacks/types.js';
import { withCallback } from '../callbacks/with-callback.js';
import { buildSharedfileUrl } from './url.js';

const INVALID_MARKERS = [
  'There was a problem accessing the item',
  'That item does not exist',
  'error_message',
];

async function sharedfileExists(url: string): Promise<boolean> {
  try {
    const html = await (await fetch(url)).text();
    return !INVALID_MARKERS.some((marker) => html.includes(marker));
  } catch {
    return false;
  }
}

export function isValidSharedfileID(
  sharedfileID: string,
  callback?: CallbackFunction<boolean>,
): Promise<boolean> {
  return withCallback(
    () => sharedfileExists(buildSharedfileUrl(sharedfileID)),
    callback,
  );
}
