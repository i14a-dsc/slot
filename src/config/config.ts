import type { Config } from "../types/config";
import { colors } from "../util/placeholder";
import "dotenv/config";

const version = "1.1.0-dev";
const config: Config = {
  version,
  development: version.includes("dev"),
  isBun: typeof Bun !== "undefined",
  secure: {
    applicationId: process.env.applicationId ?? "",
    token: process.env.token ?? "",
  },
  permissions: {
    owner: ["i14a.dsc", "i14a_dsc"],
    admin: ["ss_ririchiyo"],
    vip: ["i14a"],
    blacklist: ["070ry"],
  },
};
export function loadConfig(): Config {
  if (config.development)
    console.log(colors.gray + "config called", colors.reset);
  return config;
}
