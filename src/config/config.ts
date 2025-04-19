import type { Config } from "../types/config";
import { colors } from "../util/placeholder";

const version = "1.0.0-dev";
const config: Config = {
  version,
  development: version.includes("dev"),
  isBun: typeof Bun !== "undefined",
  secure: {
    token: process.env.token ?? "",
  },
  permissions: {
    owner: ["i14a.dsc", "i14a_dsc"],
    admin: ["ss_ririchiyo"],
    vip: ["i14a"],
    blacklist: ["070ry"],
  },
};
export function loadConfig() {
  if (config.development) console.log(colors.gray + "config called", colors.reset);
  return config;
}
