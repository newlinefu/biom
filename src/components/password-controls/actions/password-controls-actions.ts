import {
  PasswordKeyUpInterface,
  PasswordKeyDownInterface,
} from "../types/types";

const KEY_DOWN = "KEY_DOWN";
const KEY_UP = "KEY_UP";
const PASSWORD_CLEARED = "PASSWORD_CLEARED";
const VALUE_CHANGED = "VALUE_CHANGED";

interface ValueChangedAction {
  type: typeof VALUE_CHANGED;
  payload: string;
}

interface KeyDownAction {
  type: typeof KEY_DOWN;
  payload: PasswordKeyDownInterface;
}

interface KeyUpAction {
  type: typeof KEY_UP;
  payload: PasswordKeyUpInterface;
}

interface InputClearAction {
  type: typeof PASSWORD_CLEARED;
}

export type PasswordControlsAction =
  | KeyDownAction
  | InputClearAction
  | KeyUpAction
  | ValueChangedAction;

const valueChanged = (payload: string): PasswordControlsAction => ({
  type: VALUE_CHANGED,
  payload,
});
const keyDown = (
  payload: PasswordKeyDownInterface
): PasswordControlsAction => ({
  type: KEY_DOWN,
  payload,
});

const keyUp = (payload: PasswordKeyUpInterface): PasswordControlsAction => ({
  type: KEY_UP,
  payload,
});

const inputClear = (): PasswordControlsAction => ({
  type: PASSWORD_CLEARED,
});

export {
  KEY_DOWN,
  PASSWORD_CLEARED,
  KEY_UP,
  VALUE_CHANGED,
  keyDown,
  inputClear,
  keyUp,
  valueChanged,
};
