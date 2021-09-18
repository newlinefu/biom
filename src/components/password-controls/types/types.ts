export interface PasswordKeyDownInterface {
  key: string;
  keyDownTime: number;
}
export interface PasswordKeyUpInterface {
  key: string;
  keyUpTime: number;
}
export interface PasswordInputHistoryLogObject
  extends PasswordKeyDownInterface {
  keyUpTime: number;
}
