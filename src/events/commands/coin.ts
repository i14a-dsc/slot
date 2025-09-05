import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { getCoins } from "../../util/utilities";

export const command: Command = {
  data: {
    name_localizations: {
      ja: "コイン",
    },
    name: "coin",
    description_localizations: {
      ja: "あなたの現在のコインを確認します。",
    },
    description: "Check your current amount of coins",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    const current = getCoins(interaction.user);

    await interaction.reply({
      content: replace(`Your current amount of coins is ${current}%coin!`),
      flags: [64],
    });
  },
};
