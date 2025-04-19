import {
  LocalizationMap,
  Snowflake,
  APIApplicationCommandOption,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord-api-types/v10";
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
} from "discord.js";

export interface Command {
  data: APIApplicationCommand;
  /* eslint-disable-next-line no-unused-vars */
  execute(interaction: ChatInputCommandInteraction): void | Promise<void>;
}

export interface APIApplicationCommand {
  /**
   * Unique id of the command
   */
  id?: Snowflake;
  /**
   * Type of the command
   */
  type:
    | ApplicationCommandType
    | number
    | Partial<ApplicationCommandDataResolvable>;

  /**
   * Unique id of the parent application
   */
  application_id?: Snowflake;
  /**
   * Bitmask of the types of target that can be used
   */
  integration_types: ApplicationIntegrationType[];
  /**
   * Guild id of the command, if not global
   */
  guild_id?: Snowflake;
  /**
   * 1-32 character name; `CHAT_INPUT` command names must be all lowercase matching `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$`
   */
  name: string;
  /**
   * Localization dictionary for the name field. Values follow the same restrictions as name
   */
  name_localizations?: LocalizationMap | null;
  /**
   * The localized name
   */
  name_localized?: string;
  /**
   * 1-100 character description for `CHAT_INPUT` commands, empty string for `USER` and `MESSAGE` commands
   */
  description: string;
  /**
   * Localization dictionary for the description field. Values follow the same restrictions as description
   */
  description_localizations?: LocalizationMap | null;
  /**
   * The localized description
   */
  description_localized?: string;
  /**
   * The parameters for the `CHAT_INPUT` command, max 25
   */
  options?: APIApplicationCommandOption[];
  /**
   * Set of permissions represented as a bitset
   */
  default_member_permissions?: Permissions | null;
  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible
   *
   * @deprecated Use `contexts` instead
   */
  dm_permission?: boolean;
  /**
   * Whether the command is enabled by default when the app is added to a guild
   *
   * If missing, this property should be assumed as `true`
   *
   * @deprecated Use `dm_permission` and/or `default_member_permissions` instead
   */
  default_permission?: boolean;
  /**
   * Indicates whether the command is age-restricted, defaults to `false`
   */
  nsfw?: boolean;
  /**
   * Installation context(s) where the command is available, only for globally-scoped commands. Defaults to `GUILD_INSTALL ([0])`
   *
   * @unstable
   */
  integration_types: ApplicationIntegrationType[];
  /**
   * Interaction context(s) where the command can be used, only for globally-scoped commands. By default, all interaction context types included for new commands `[0,1,2]`.
   *
   * @unstable
   */
  contexts?: InteractionContextType[] | null;
  /**
   * Autoincrementing version identifier updated during substantial record changes
   */
  version?: Snowflake;
}
