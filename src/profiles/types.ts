/** Fields present on every Steam profile XML document. */
export interface MinimalSteamProfile {
  steamID64: [string];
  steamID: [string];
  onlineState: [string];
  privacyState: [string];
  visibilityState: [string];
  vacBanned: [string];
  tradeBanState: [string];
  isLimitedAccount: [string];
}

/** Fields that only appear on richer / public profiles. */
export interface ExtendedProfileFields {
  stateMessage?: [string];
  memberSince?: [string];
  steamRating?: [string];
  hoursPlayed2Wk?: [string];
  customURL?: [string];
  avatarIcon?: [string];
  avatarMedium?: [string];
  avatarFull?: [string];
  headline?: [string];
  location?: [string];
  realname?: [string];
  summary?: [string];
}

export interface GameInfo {
  gameName: [string];
  gameLink: [string];
  gameIcon: [string];
  gameLogo: [string];
  gameLogoSmall: [string];
  hoursPlayed: [string];
  hoursOnRecord: [string];
  statsName: [string];
}

export interface MostPlayedGames {
  mostPlayedGame?: GameInfo[];
}

/** Group summary embedded on a profile (not a full group document). */
export interface ProfileGroup {
  $?: { isPrimary: string };
  groupID64: [string];
  groupName?: [string];
  groupURL?: [string];
  headline?: [string];
  summary?: [string];
  avatarIcon?: [string];
  avatarMedium?: [string];
  avatarFull?: [string];
  memberCount?: [string];
  membersInChat?: [string];
  membersInGame?: [string];
  membersOnline?: [string];
}

export interface ProfileGroups {
  group?: ProfileGroup[];
}

export interface FullProfileInfo
  extends MinimalSteamProfile,
    ExtendedProfileFields {
  mostPlayedGames?: [MostPlayedGames];
  groups?: [ProfileGroups];
}
