export class SlotMachine {
  private _results: number[] = [];
  private static jackpotPercentage = 0.001;
  private static matchPercentage = 0.05;

  constructor() {}

  public spin(): number[] {
    const rand = Math.random();
    if (rand < SlotMachine.jackpotPercentage) {
      this._results = [7, 7, 7];
    } else if (
      rand <
      SlotMachine.jackpotPercentage + SlotMachine.matchPercentage
    ) {
      const num = Math.floor(Math.random() * 6) + 1;
      this._results = [num, num, num];
    } else {
      this._results = Array.from({ length: 3 }, () => this.random());
    }
    return this._results;
  }

  public judge() {
    const [a, b, c] = this._results;
    if (a === b && b === c) {
      return "win";
    }
    if ((a === b && b !== c) || (a === c && b !== a) || (b === c && a !== b)) {
      return "reach";
    }
    return "lose";
  }

  private random() {
    return Math.floor(Math.random() * 9) + 1;
  }

  get results() {
    return this._results;
  }
}
