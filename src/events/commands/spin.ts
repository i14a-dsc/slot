import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { SlotMachine } from "../../util/slot";
import { timeout } from "../../util/timeout";
import { addCoin, getCoins, removeCoin } from "../../util/utilities";

export const command: Command = {
  data: {
    name_localizations: {
      ja: "スピン",
    },
    name: "spin",
    description_localizations: {
      ja: "スロットを回します。",
    },
    description: "Spin the wheel",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "bet",
        description_localizations: {
          ja: "賭け金額",
        },
        description: "Your bet",
        type: 4,
      },
      {
        name: "ephemeral",
        description_localizations: {
          ja: "返答を現在のチャンネルに公開しないようにします。",
        },
        description: "Make the reply ephemeral",
        type: 5,
      },
      {
        name: "quick",
        description_localizations: {
          ja: "アニメーションをスキップします。",
        },
        description: "Quick spin",
        type: 5,
      },
    ],
  },
  async execute(interaction) {
    const bet = interaction.options.getInteger("bet") ?? 0;
    if (bet < 0) {
      await interaction.reply({
        content: "You cannot bet negative coins!",
        flags: [64],
      });
      return;
    }
    const currentCoins = getCoins(interaction.user);
    if (bet > currentCoins) {
      await interaction.reply({
        content: "You don't have enough coins!",
        flags: [64],
      });
      return;
    }
    removeCoin(interaction.user, bet);
    const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;
    const quick = interaction.options.getBoolean("quick") ?? false;

    await interaction.reply({
      content: "Pulling the lever...",
      flags: ephemeral ? [64] : [],
    });
    await timeout(1500);
    const machine = new SlotMachine();
    machine.spin();
    if (!quick) {
      await interaction.editReply({
        content: replace(`# %${machine.results[0]} ...`),
      });
      await timeout(1000);
      await interaction.editReply({
        content: replace(`# %${machine.results[0]} %${machine.results[1]} ...`),
      });
      await timeout(1250);
      await interaction.editReply({
        content: replace(
          `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`
        ),
      });
      await timeout(700);
    }
    if (bet > 0) {
      const result = machine.judge();
      if (result === "win") {
        const isJackpot = machine.results.every((num) => num === 7);
        const isTriple =
          machine.results[0] >= 1 &&
          machine.results[0] <= 6 &&
          machine.results.every((num) => num === machine.results[0]);

        let multiplier = 0;
        if (isJackpot) {
          multiplier = 100;
        } else if (isTriple) {
          multiplier = 10;
        } else {
          multiplier = 2;
        }

        const winnings = bet * multiplier;
        const { current } = addCoin(interaction.user, winnings);

        await interaction.editReply({
          content: replace([
            `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
            `あなたは... 大当たりです！`,
            isJackpot
              ? `# :crown: JACKPOT!!\n大当たり！ あなたは ${winnings}%coin 勝ちました！`
              : `あなたは ${winnings}%coin (${multiplier}x) 勝ちました！`,
            `あなたの現在のコイン残高は ${current}%coin になりました！`,
          ]),
        });
        return;
      } else if (result === "reach") {
        await interaction.editReply({
          content: replace([
            `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
            `あなたは... リーチです！`,
            `あなたの賭け金 ${bet}%coin が返還されました！`,
          ]),
        });
        addCoin(interaction.user, bet);
        return;
      } else {
        await interaction.editReply({
          content: replace([
            `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
            `あなたは... ${machine.judge()}です！`,
            `あなたの賭け金 ${bet}%coin が闇の中へ...`,
            `あなたの現在のコイン残高は ${getCoins(
              interaction.user
            )}%coin です`,
          ]),
        });
        return;
      }
    }

    await interaction.editReply({
      content: replace([
        `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
        `あなたは... ${machine.judge()}です！`,
      ]),
    });
  },
};
