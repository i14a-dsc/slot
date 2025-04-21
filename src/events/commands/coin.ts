import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { getCoins } from "../../util/utilities";

export const command: Command = {
  data: {
    name: "coin",
    description: "Check your current amount of coins",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    const current = getCoins(interaction.user);

    await interaction.reply({
      content: replace(`You have ${current}%coin!`),
      flags: [64],
    });
  },
};
