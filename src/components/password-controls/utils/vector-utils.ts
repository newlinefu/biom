import { PasswordInputHistoryLogObject } from "../types/types";

const createVectorFunctionData = (
  inputLog: PasswordInputHistoryLogObject[],
  amplitude: number
): { annotations: string[]; values: [number, number][] } => {
  const annotations: string[] = [];
  const values: [number, number][] = [];

  for (let i = 0; i < inputLog.length; i++) {
    const referenceDown = inputLog[i].keyDownTime;
    const referenceUp = inputLog[i].keyUpTime;
    let coincidenceCountDown = 1;
    let coincidenceCountUp = 1;

    for (let j = 0; j < inputLog.length; j++) {
      if (
        j !== i &&
        inputLog[j].keyDownTime <= referenceDown &&
        referenceDown <= inputLog[j].keyUpTime
      ) {
        coincidenceCountDown++;
      }
      if (
        j !== i &&
        inputLog[j].keyDownTime <= referenceUp &&
        referenceUp <= inputLog[j].keyUpTime
      ) {
        coincidenceCountUp++;
      }
    }

    annotations.push(inputLog[i].key);
    values.push([referenceDown, (coincidenceCountDown - 1) * amplitude]);
    values.push([referenceDown, coincidenceCountDown * amplitude]);
    values.push([referenceUp, coincidenceCountUp * amplitude]);
    values.push([referenceUp, (coincidenceCountUp - 1) * amplitude]);
  }

  return {
    annotations,
    values: values.sort((entry1, entry2) => entry1[0] - entry2[0]),
  };
};

export { createVectorFunctionData };
