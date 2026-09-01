export interface GroupDetails {
  groupName: [string];
  groupURL: [string];
  headline: [string];
  summary: [string];
  avatarIcon: [string];
  avatarMedium: [string];
  avatarFull: [string];
  memberCount: [string];
  membersInChat: [string];
  membersInGame: [string];
  membersOnline: [string];
}

export interface FullGroupInfo {
  groupID64: [string];
  groupDetails: [GroupDetails];
  memberCount: [string];
  totalPages: [string];
  currentPage: [string];
  startingMember: [string];
  nextPageLink?: [string];
  members: [{ steamID64: string[] }];
}
