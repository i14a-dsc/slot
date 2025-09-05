export class SlotMachine {
  private _results: number[] = [];

  constructor() {}

  public spin(): number[] {
    this._results = Array.from({ length: 3 }, () => this.random());
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
