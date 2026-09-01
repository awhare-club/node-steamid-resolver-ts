import type { FullGroupInfo } from '../groups/types.js';
import type { FullProfileInfo } from '../profiles/types.js';

/** Raw xml2js output before a domain classifies the document. */
export interface RawSteamXml {
  profile?: FullProfileInfo;
  memberList?: FullGroupInfo;
  response?: { error: [string] };
}

/** Discriminated Steam Community XML document. */
export type SteamXMLResponse =
  | { type: 'profile'; data: FullProfileInfo }
  | { type: 'group'; data: FullGroupInfo }
  | { type: 'error'; error: string }
  | { type: 'empty'; error: string };

/** Structured `<response><error>` document from Steam. */
export interface SteamErrorResponse {
  response: {
    error: [string];
  };
}

/** Reserved public options type (not wired into lookups yet). */
export interface ResolverOptions {
  timeout?: number;
  userAgent?: string;
  retries?: number;
}
