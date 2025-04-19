export class SlotMachine {
  public declare results: number[];
  constructor() {}

  public spin() {
    let results: number[] = [];
    for (let i = 0; i < 3; i++) {
      results.push(this.random());
    }

    this.results = results;
    return results;
  }

  public judge(result: number[] = this.results) {
    if (result[0] === result[1] && result[1] === result[2]) {
      return "win";
    }
    if (
      result[0] === result[1] ||
      result[1] === result[2] ||
      result[0] === result[2]
    ) {
      return "reach";
    }
    return "lose";
  }

  public random() {
    return Math.floor(Math.random() * 9) + 1;
  }
}
