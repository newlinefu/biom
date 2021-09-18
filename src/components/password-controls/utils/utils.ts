import {
  PasswordInputHistoryLogObject,
  PasswordKeyUpInterface,
} from "../types/types";

const cyrillicLowerAlph = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const cyrillicUpperAlph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const engLowerAlph = "abcdefghijklmnopqrstuvwxyz";
const engUpperAlph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specSymbols = `~!@#$%^&*{}[]\`|/\\?.,><'":;`;

const insertUpTimeToLog = (
  log: PasswordInputHistoryLogObject[],
  upInformation: PasswordKeyUpInterface
): PasswordInputHistoryLogObject[] => {
  let copiedLog = [...log];
  const { key, keyUpTime } = upInformation;

  for (let i = 0; i < copiedLog.length; i++) {
    const actualLogRecord = copiedLog[i];
    if (actualLogRecord.key === key && actualLogRecord.keyUpTime === 0) {
      copiedLog[i] = { ...copiedLog[i], keyUpTime };
      copiedLog = copiedLog.filter((record) => {
        return !(record.key === key && record.keyUpTime === 0);
      });
      break;
    }
  }

  return copiedLog;
};

const containsSymbolFromAlph =
  (alph: string) =>
  (password: string): boolean => {
    for (let i = 0; i < password.length; i++) {
      const actualSymbol = password[i];

      if (alph.includes(actualSymbol)) {
        return true;
      }
    }
    return false;
  };

const calculatePasswordComplexity = (password: string) => {
  if (password.length < 5) {
    return 0;
  }

  let complexity = 0;
  complexity += password.length > 8 ? 2 : 1;
  complexity += containsSymbolFromAlph(cyrillicLowerAlph)(password) ? 1 : 0;
  complexity += containsSymbolFromAlph(cyrillicUpperAlph)(password) ? 1 : 0;
  complexity += containsSymbolFromAlph(engLowerAlph)(password) ? 1 : 0;
  complexity += containsSymbolFromAlph(engUpperAlph)(password) ? 1 : 0;
  complexity += containsSymbolFromAlph(specSymbols)(password) ? 1 : 0;

  return Math.floor(+(complexity / 7).toFixed(2) * 100)
};

export { insertUpTimeToLog, calculatePasswordComplexity };
