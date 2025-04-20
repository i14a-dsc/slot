import type { Command } from "../../types/command";
import { replace } from "../../util/placeholder";
import { SlotMachine } from "../../util/slot";
import { timeout } from "../../util/timeout";

export const command: Command = {
  data: {
    name: "spin",
    description: "Spin the wheel",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: "ephemeral",
        description: "Make the reply ephemeral",
        type: 5,
      },
    ],
  },
  async execute(interaction) {
    const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;
    await interaction.reply({
      content: "Pulling the lever...",
      flags: ephemeral ? [64] : [],
    });
    await timeout(1500);
    const machine = new SlotMachine();
    machine.spin();
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
    await timeout(750);
    await interaction.editReply({
      content: replace([
        `# %${machine.results[0]} %${machine.results[1]} %${machine.results[2]}`,
        `あなたは... %${machine.judge()}！`,
      ]),
    });
  },
};
