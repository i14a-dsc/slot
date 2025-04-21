import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { getCoins } from "../../util/utilities";

export const command: Command = {
  data: {
    name: "daily",
    description: "Claim your Daily reward",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    const current = await getCoins(interaction.user);

    await interaction.reply({
      content: replace([`You have ${current}%coin!`]),
      flags: [64],
    });
  },
};
