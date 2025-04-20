export interface Config {
  secure: SecureConfig;
  permissions: ConfigPermissions;
  development: boolean;
  version: string;
  isBun: boolean;
}

export interface SecureConfig {
  token: string;
  applicationId: string;
}

export interface ConfigPermissions {
  owner: string[];
  admin: string[];
  vip: string[];
  blacklist: string[];
}
