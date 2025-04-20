import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { addCoin, claimDailyBonus, randomInt } from "../../util/utilities";

export const command: Command = {
  data: {
    name: "daily",
    description: "Claim your Daily reward",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    const daily = claimDailyBonus(interaction.user);

    if (!daily.success) {
      await interaction.reply({
        content: "You already claimed your Daily reward today!",
        flags: [64],
      });
      return;
    }
    const rewardCoins = randomInt(50, 200);
    const { current } = addCoin(interaction.user, rewardCoins);

    await interaction.reply({
      content: replace([
        `You claimed your Daily reward!`,
        `You received ${rewardCoins}%coin!`,
        `You now have ${current}%coin.`,
      ]),
      flags: [64],
    });
  },
};
