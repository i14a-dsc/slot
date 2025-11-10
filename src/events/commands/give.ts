import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { addCoin } from "../../util/utilities";

export const command: Command = {
  data: {
    name: "give",
    description: "Give the conis to specific user",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "user",
        description: "The user to give the coins to",
        type: 6,
        required: true,
      },
      {
        name: "amount",
        description: "The amount of coins to give",
        type: 4,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser("user", true);
    const amount = interaction.options.getInteger("amount", true);

    const { current } = addCoin(user, amount);

    await interaction.reply({
      content: replace([
        `You gave <@${user.id}> ${amount}%coin!`,
        `Now <@${user.id}>'s current amount of coins is ${current}%coin.`,
      ]),
      flags: [64],
    });
  },
};
