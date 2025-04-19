import fs from "fs";
import { client } from "..";

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function userTimeout(ms: number, username: string, reason?: string) {
  const data = JSON.parse(
    fs.readFileSync("./data/timeout.json", "utf-8")
  ) as TimeoutJSON[];
  data.push({
    username,
    time: Date.now() + ms,
    reason: reason ?? "No reason provided",
  });
  fs.writeFileSync(
    "./data/timeout.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export function globalTimeout(ms: number, reason?: string) {
  const data = JSON.parse(
    fs.readFileSync("./data/timeout.json", "utf-8")
  ) as TimeoutJSON[];
  data.push({
    username: "global",
    time: Date.now() + ms,
    reason: reason ?? "No reason provided",
  });
  fs.writeFileSync(
    "./data/timeout.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export function checkTimeout(username: string): boolean {
  if (
    client.config.permissions.owner.includes(username) ||
    client.config.permissions.admin.includes(username) ||
    client.config.permissions.vip.includes(username)
  )
    return false;
  if (client.config.permissions.blacklist.includes(username)) return true;
  const data = JSON.parse(
    fs.readFileSync("./data/timeout.json", "utf-8")
  ) as TimeoutJSON[];
  const user = data.find((user) => user.username === username);
  if (!user) return false;
  return user.time < Date.now();
}

export function checkGlobalTimeout(): boolean {
  const data = JSON.parse(
    fs.readFileSync("./data/timeout.json", "utf-8")
  ) as TimeoutJSON[];
  const user = data.find((user) => user.username === "global");
  if (!user) return false;
  return user.time < Date.now();
}

export function clearAllTimeouts() {
  fs.writeFileSync("./data/timeout.json", "[]", "utf-8");
}

export function clearTimeout(username: string) {
  const data = JSON.parse(
    fs.readFileSync("./data/timeout.json", "utf-8")
  ) as TimeoutJSON[];
  const index = data.findIndex((user) => user.username === username);
  if (index === -1) return;
  data.splice(index, 1);
  fs.writeFileSync(
    "./data/timeout.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// data/timeout.json: TimeoutJSON[]
interface TimeoutJSON {
  username: string;
  time: number;
  reason: string;
}
