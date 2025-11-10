import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { addCoin, claimDailyBonus, randomInt } from "../../util/utilities";

export const command: Command = {
  data: {
    name_localizations: {
      ja: "デイリー",
    },
    name: "daily",
    description_localizations: {
      ja: "デイリーボーナスを受け取ります。",
    },
    description: "Claim your Daily reward",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
  },
  async execute(interaction) {
    const daily = claimDailyBonus(interaction.user);

    if (!daily.success) {
      await interaction.reply({
        content:
          "すでにデイリーボーナスを受け取りました。また明日来てください！",
        flags: [64],
      });
      return;
    }
    const rewardCoins = randomInt(50, 200);
    const { current } = addCoin(interaction.user, rewardCoins);

    await interaction.reply({
      content: replace([
        `デイリーボーナスを受け取りました！`,
        `${rewardCoins}%coin を獲得しました！`,
        `現在の所持コインは ${current}%coin です。`,
      ]),
      flags: [64],
    });
  },
};
