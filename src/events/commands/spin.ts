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
    if (bet > 0)
      switch (machine.judge()) {
        case "win":
          const { current } = addCoin(interaction.user, bet * 2);
          await interaction.editReply({
            content: replace([
              `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
              `あなたは... %${machine.judge()}です！`,
              `You won ${bet}%coin!`,
              `Now your current amount of coins is ${current}%coin!`,
            ]),
          });
          return;
        case "reach":
          await interaction.editReply({
            content: replace([
              `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
              `あなたは... %${machine.judge()}です！`,
              `Your bet ${bet}%coin has been returned!`,
            ]),
          });
          addCoin(interaction.user, bet);
          return;
        case "lose":
          await interaction.editReply({
            content: replace([
              `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
              `あなたは... %${machine.judge()}です！`,
              `You lost ${bet}%coin...`,
              `Now your current amount of coins is ${getCoins(
                interaction.user
              )}%coin!`,
            ]),
          });
          return;
      }
    await interaction.editReply({
      content: replace([
        `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
        `あなたは... %${machine.judge()}です！`,
      ]),
    });
  },
};
