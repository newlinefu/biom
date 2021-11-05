export enum FormFiledNames {
  Name = 'name',
  Password = 'password',
  Email = 'email'
}

export interface PasswordKeyDownInterface {
  key: string;
  code: string;
  keyDownTime: number;
}
export interface PasswordKeyUpInterface {
  key: string;
  code: string;
  keyUpTime: number;
}
export interface PasswordInputHistoryLogObject
  extends PasswordKeyDownInterface {
  keyUpTime: number;
}

export interface SingleHoldCalculatingInformation {
  harResult: number[];
  holdTime: number;
}

export interface VectorCalculatingResultData {
  amplitude: number;
  pressCount: number;
  functionsResult: number[];
  holdTimeCalculating: SingleHoldCalculatingInformation[];
}

export interface RegistrationObject {
  name: string;
  email: string;
  password: string;
  records: PasswordInputHistoryLogObject[];
}
