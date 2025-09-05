import type { Interaction } from "discord.js";
import { client } from "../..";

export async function interactionCreate(interaction: Interaction) {
  if (interaction.isCommand()) {
    const command = (
      await import("../commands/" + interaction.commandName + ".ts")
    ).command;
    await command.execute(interaction);
    return;
  }
  if (interaction.isButton()) {
    if (interaction.customId === "restart") {
      await client.stop();
    }
    return;
  }
}
