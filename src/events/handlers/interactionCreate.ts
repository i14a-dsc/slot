import type { Interaction } from "discord.js";

export async function interactionCreate(interaction: Interaction) {
  if (!interaction.isCommand()) return;

  const command = (
    await import("../commands/" + interaction.commandName + ".ts")
  ).command;
  await command.execute(interaction);
}
