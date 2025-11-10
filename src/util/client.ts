import {
  Client,
  ClientApplication,
  ClientUser,
  REST,
  Routes,
  type ClientOptions,
} from "discord.js";
import "dotenv/config";
import type { Config } from "../types/config";

import fs from "fs";

import { loadConfig } from "../config/config";
import { interactionCreate } from "../events/handlers/interactionCreate";
import { ready } from "../events/handlers/ready";
import type { APIApplicationCommand, Command } from "../types/command";

export class SlotBot extends Client {
  config: Config = loadConfig();
  public declare user: ClientUser;
  public declare application: ClientApplication;
  public initialized: boolean = false;

  constructor(
    options?: Omit<Omit<ClientOptions, "intents">, "allowedMentions">
  ) {
    super({
      ...options,
      intents: ["DirectMessages"],
      allowedMentions: { parse: [] },
    });
  }

  public async init() {
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    this.verifyConfig();
    super.login(this.config.secure.token);
    await this.publishCommands();
    this.handleEvents();
  }

  /* eslint-disable-next-line no-unused-vars */
  public login(token?: unknown): Promise<string> {
    throw new Error(
      "You can't use this method. Please use `Client.init()` instead."
    );
  }

  private verifyConfig() {
    if (!this.config.secure.token) {
      throw new Error("No token provided");
    }
    if (!this.config.secure.applicationId) {
      throw new Error("No application id provided.");
    }
    if (!this.config.permissions.owner.length) {
      throw new Error("No owner provided");
    }
  }

  private async handleEvents() {
    super.on("clientReady", ready);
    super.on("interactionCreate", interactionCreate);
  }

  private async publishCommands() {
    const dir = "events/commands/";
    const files = fs
      .readdirSync((this.config.isBun ? "src/" : "dist/") + dir, "utf-8")
      .filter((f) => f.endsWith(this.config.isBun ? ".ts" : ".js"));

    let commandData: APIApplicationCommand[] = [];

    for (const file of files) {
      commandData.push(
        ((await (await import("../" + dir + file)).command) as Command).data
      );
    }

    new REST({ version: "10" })
      .setToken(this.config.secure.token)
      .put(Routes.applicationCommands(this.config.secure.applicationId), {
        body: commandData,
      });
  }

  public async stop(stopCode: number = 0) {
    try {
      await this.destroy();
    } catch {
      console.error("Client doesn't initialized.");
    }
    process.exit(stopCode);
  }
}
