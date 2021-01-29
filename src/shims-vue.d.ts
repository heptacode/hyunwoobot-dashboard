declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
  userRoles?: Role[];
  roles?: Role[];
}

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

interface Role {
  id: string;
  name: string;
  color: string | null;
}
