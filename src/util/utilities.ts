import fs from "fs";
import type { CoinJSON, DailyJSON, MinimalUserObject } from "../types/json";

export function claimDailyBonus({ username, id }: MinimalUserObject): {
  success: boolean;
  json?: DailyJSON;
} {
  if (!fs.existsSync("./data/daily.json")) {
    fs.writeFileSync("./data/daily.json", "[]", "utf-8");
  }
  const data: DailyJSON[] = JSON.parse(
    fs.readFileSync("./data/daily.json", "utf-8")
  );

  const index = data.findIndex((user) => user.id === id);
  if (index === -1) {
    const d = { id, username, date: getDate(), count: 1, streak: 1 };
    data.push(d);
    fs.writeFileSync(
      "./data/daily.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    return { success: true, json: d };
  } else {
    if (data[index].date.join("") === getDate().join(""))
      return { success: false };
    data[index].count += 1;
    const [day, month, year] = getDate();
    const [lastDay, lastMonth, lastYear] = data[index].date;

    const isLeapYear = (year: number) =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = (month: number, year: number) =>
      month === 2 && isLeapYear(year) ? 29 : new Date(year, month, 0).getDate();

    const isNextDay =
      (day === 1 &&
        ((lastDay === daysInMonth(lastMonth, lastYear) &&
          lastMonth === month - 1) ||
          (lastMonth === 12 && month === 1 && lastYear === year - 1))) ||
      (day === lastDay + 1 && month === lastMonth && year === lastYear);

    data[index].streak = isNextDay ? data[index].streak + 1 : 0;
    data[index].date = [day, month, year];
  }
  fs.writeFileSync("./data/daily.json", JSON.stringify(data, null, 2), "utf-8");

  return {
    success: true,
    json: data[index],
  };
}

export function addCoin({ username, id }: MinimalUserObject, amount: number) {
  if (!fs.existsSync("./data/coins.json")) {
    fs.writeFileSync("./data/coins.json", "[]", "utf-8");
  }
  const data: CoinJSON[] = JSON.parse(
    fs.readFileSync("./data/coins.json", "utf-8")
  );
  const index = data.findIndex((user) => user.id === id);
  if (index === -1) {
    const d = { id, username, amount };
    data.push(d);
    fs.writeFileSync(
      "./data/coins.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    return {
      current: d.amount,
      added: amount,
      old: 0,
    };
  } else {
    data[index].amount += amount;
  }
  fs.writeFileSync("./data/coins.json", JSON.stringify(data, null, 2), "utf-8");

  return {
    current: data[index].amount,
    added: amount,
    old: data[index].amount - amount,
  };
}

export function removeCoin({ id }: MinimalUserObject, amount: number) {
  if (!fs.existsSync("./data/coins.json")) {
    fs.writeFileSync("./data/coins.json", "[]", "utf-8");
  }
  const data: CoinJSON[] = JSON.parse(
    fs.readFileSync("./data/coins.json", "utf-8")
  );
  const index = data.findIndex((user) => user.id === id);
  if (index === -1)
    return {
      success: false,
      current: 0,
      removed: 0,
      old: 0,
    };
  data[index].amount -= amount;
  fs.writeFileSync("./data/coins.json", JSON.stringify(data, null, 2), "utf-8");

  return {
    success: true,
    current: data[index].amount,
    removed: amount,
    old: data[index].amount + amount,
  };
}

export function setCoin({ id }: MinimalUserObject, amount: number) {
  if (!fs.existsSync("./data/coins.json")) {
    fs.writeFileSync("./data/coins.json", "[]", "utf-8");
  }
  const data: CoinJSON[] = JSON.parse(
    fs.readFileSync("./data/coins.json", "utf-8")
  );
  const index = data.findIndex((user) => user.id === id);
  if (index === -1) {
    const d = { id, username: "", amount };
    data.push(d);
    fs.writeFileSync(
      "./data/coins.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    return {
      current: d.amount,
      old: 0,
    };
  }
  data[index].amount = amount;
  fs.writeFileSync("./data/coins.json", JSON.stringify(data, null, 2), "utf-8");

  return {
    current: data[index].amount,
    old: data[index].amount,
  };
}

export function getCoins({ id }: MinimalUserObject) {
  if (!fs.existsSync("./data/coins.json")) {
    fs.writeFileSync("./data/coins.json", "[]", "utf-8");
  }
  const data: CoinJSON[] = JSON.parse(
    fs.readFileSync("./data/coins.json", "utf-8")
  );
  const index = data.findIndex((user) => user.id === id);
  if (index === -1) return 0;
  return data[index].amount;
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getDate(): [number, number, number] {
  const date = new Date();
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()];
}
