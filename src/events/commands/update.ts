import { ButtonStyle, ComponentType } from "discord.js";
import type { Command } from "../../types/command";
import { exec } from "child_process";

export const command: Command = {
  data: {
    name: "update",
    description: "Update the bot from github",
    description_localizations: {
      ja: "GithubからBotを更新します。",
    },
    type: 1,
    contexts: [0, 1, 2],
    integration_types: [0, 1],
  },
  execute: async (interaction) => {
    await interaction.reply({
      content: "Updating from github...",
      flags: [64],
    });
    exec("git pull", (error, stdout, stderr) => {
      if (error) {
        interaction.editReply({
          content: "Error updating from github...",
        });
        console.error(error);
      } else {
        if (stdout.includes("Already up to date.")) {
          interaction.editReply({
            content: "Already up to date.",
          });
        } else {
          interaction.editReply({
            content: "Updated from github.",
            components: [
              {
                type: 1,
                components: [
                  {
                    type: ComponentType.Button,
                    style: ButtonStyle.Secondary,
                    customId: "restart",
                    label: "Restart",
                  },
                ],
              },
            ],
          });
        }
      }
    });
  },
};
