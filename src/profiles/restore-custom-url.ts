import { extractString } from '../steam-community/xml-value.js';
import type { FullProfileInfo } from './types.js';

async function customUrlFromRedirect(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url, { redirect: 'manual' });
    const location = response.headers.get('location');
    if (!location?.includes('steamcommunity.com/id/')) {
      return undefined;
    }

    const segments = location.split('/');
    if (segments.at(-1) === '') {
      segments.pop();
    }
    return segments.at(-1) || undefined;
  } catch {
    return undefined;
  }
}

/** Private profiles omit customURL; recover it from the request or redirect. */
export async function restorePrivateCustomUrl(
  profile: FullProfileInfo,
  url: string,
): Promise<FullProfileInfo> {
  if (extractString(profile.privacyState) === 'public') {
    return profile;
  }

  if (url.includes('steamcommunity.com/profiles/')) {
    const customURL = await customUrlFromRedirect(url);
    return customURL ? { ...profile, customURL: [customURL] } : profile;
  }

  if (url.includes('steamcommunity.com/id/')) {
    const customURL = url.split('/').pop()?.replace('?xml=1', '');
    return customURL ? { ...profile, customURL: [customURL] } : profile;
  }

  return profile;
}
