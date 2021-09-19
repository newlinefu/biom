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
