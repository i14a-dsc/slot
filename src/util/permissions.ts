import { client } from "..";
export function isAdmin(user: { username?: string; id?: string }) {
  return (
    client.config.permissions.admin.includes(user.username ?? "+") ||
    client.config.permissions.admin.includes(user.id ?? "+")
  );
}
