import fs from "fs";
import { client } from "..";

const placeholders: { name: string; value: string }[] = JSON.parse(
  fs.readFileSync("data/placeholders.json", "utf-8")
);

export const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  black: "\x1b[30m",
  gray: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
  reset: "\x1b[0m",
};

export class Placeholder {
  public declare result: string;

  constructor(
    public value: string | string[] = "",
    public noColor: boolean = false
  ) {
    if (Array.isArray(value)) {
      this.result = value.join("\n");
    } else this.result = value;
  }

  replace(args?: string[]) {
    if (args) {
      args.forEach((arg, index) => {
        this._replace(`%${index + 1}`, arg);
      });
    }

    this._replace("%version", client.config.version);
    this._replace(
      "%date",
      new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
    );
    placeholders.forEach((placeholder) => {
      this._replace(`%${placeholder.name}`, placeholder.value);
    });
    if (this.noColor) return this.result;

    this._replace("%red", colors.red);
    this._replace("%green", colors.green);
    this._replace("%yellow", colors.yellow);
    this._replace("%blue", colors.blue);
    this._replace("%magenta", colors.magenta);
    this._replace("%cyan", colors.cyan);
    this._replace("%white", colors.white);
    this._replace("%black", colors.black);
    this._replace("%gray", colors.gray);
    this._replace("%!red", colors.brightRed);
    this._replace("%!green", colors.brightGreen);
    this._replace("%!yellow", colors.brightYellow);
    this._replace("%!blue", colors.brightBlue);
    this._replace("%!magenta", colors.brightMagenta);
    this._replace("%!cyan", colors.brightCyan);
    this._replace("%!white", colors.brightWhite);
    this._replace("%r", colors.reset);

    return this.result;
  }

  private _replace(string: string, result: string) {
    this.result = this.result.replaceAll(string, result);
  }
}

export function replace(value: string | string[], ...args: Array<string>) {
  const placeholder = new Placeholder(value);
  return placeholder.replace(args);
}
