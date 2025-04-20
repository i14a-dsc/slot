export interface DailyJSON {
  /**
   * Discord User ID
   */
  id: string;
  /**
   * Username
   *
   * If username changed, this will be updated
   */
  username: string;
  /**
   * Date of last claim
   *
   * @example [2025, 4, 20]
   */
  date: number[];
  /**
   * Number of times claimed
   */
  count: number;
  /**
   * Number of streak days
   */
  streak: number;
}

export interface CoinJSON {
  /**
   * Discord User ID
   */
  id: string;
  /**
   * Username
   *
   * If username changed, this will be updated
   */
  username: string;
  /**
   * Amount of coins
   */
  amount: number;
}

export interface MinimalUserObject {
  id: string;
  username: string;
}
