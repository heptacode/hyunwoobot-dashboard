import "vue-router/types/vue";

interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: number;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
}

interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  member: GuildMember;
  userRoles: Role[];
}

interface GuildMember {
  displayName: string;
  displayHexColor: string;
  presence: APIGuildUserPresence;
  roles: string[];
}

interface GuildUserPresence {
  activities: any[];
  status: string;
}

interface Role {
  id: string;
  name: string;
  color: string | null;
}
