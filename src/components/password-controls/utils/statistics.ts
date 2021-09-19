import { PasswordInputHistoryLogObject } from "../types/types";

const createIntervalSelection = (data: PasswordInputHistoryLogObject[]) => {
  const intervals: number[] = [];
  for (let i = 1; i < data.length; i++) {
    intervals.push((data[i].keyDownTime - data[i - 1].keyDownTime) / 1000);
  }

  return intervals;
};

const createPressTimeSelection = (data: PasswordInputHistoryLogObject[]) =>
  data.map((value) => value.keyUpTime - value.keyDownTime);

const calculateDispersion = async (data: number[], expectedValue: number) => {
  return new Promise((res) => {
    if (data.length < 2) {
      return 0;
    }

    const numerator = data.reduce(
      (result, value) =>
        result + (value - expectedValue) * (value - expectedValue)
    );

    res(numerator / (data.length - 1));
  });
};

const calculateExpectedValue = async (data: number[]) => {
  return new Promise((res) => {
    if (data.length === 0) {
      return 0;
    }
    const dataSum = data.reduce((sum, value) => value + sum, 0);
    res(dataSum / data.length);
  });
};

const calculatePressTimeSum = async (data: PasswordInputHistoryLogObject[]) => {
  return new Promise((res) => {
    const pressTimeSum = data.reduce(
      (pressTimeSum, value) =>
        pressTimeSum + (value.keyUpTime - value.keyDownTime),
      0
    );

    res(pressTimeSum);
  });
};

const calculateGallopSuperposition = async (
  data: PasswordInputHistoryLogObject[]
) => {
  return new Promise((res) => {
    let superposition = 0;

    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[j].keyDownTime > data[i].keyUpTime) {
          continue;
        }
        if (
          data[j].keyDownTime < data[i].keyUpTime &&
          data[j].keyUpTime < data[i].keyUpTime
        ) {
          continue;
        }

        if (
          data[j].keyDownTime < data[i].keyUpTime &&
          data[j].keyUpTime > data[i].keyUpTime
        ) {
          superposition += data[i].keyUpTime - data[j].keyDownTime;
        }
      }
    }

    res(superposition);
  });
};

const calculateAbsorptionSuperposition = async (
  data: PasswordInputHistoryLogObject[]
) => {
  return new Promise((res) => {
    let superposition = 0;

    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[j].keyDownTime > data[i].keyUpTime) {
          continue;
        }

        if (
          data[j].keyDownTime < data[i].keyUpTime &&
          data[j].keyUpTime < data[i].keyUpTime
        ) {
          superposition += data[j].keyUpTime - data[j].keyDownTime;
        }
      }
    }

    res(superposition);
  });
};

export {
  calculatePressTimeSum,
  calculateExpectedValue,
  calculateDispersion,
  createPressTimeSelection,
  createIntervalSelection,
  calculateAbsorptionSuperposition,
  calculateGallopSuperposition,
};
