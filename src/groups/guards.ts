import { isRecord } from '../steam-community/xml-value.js';
import type { FullGroupInfo } from './types.js';

export function isGroupResponse(
  data: unknown,
): data is { memberList: FullGroupInfo } {
  return isRecord(data) && 'memberList' in data;
}
