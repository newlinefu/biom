import { PasswordInputHistoryLogObject } from "../types/types";
import {
  KEY_DOWN,
  KEY_UP,
  PASSWORD_CLEARED,
  VALUE_CHANGED,
  PasswordControlsAction,
} from "../actions/password-controls-actions";
import { calculatePasswordComplexity, insertUpTimeToLog } from "../utils/utils";

interface PasswordControlsStateInterface {
  readonly inputValue: string;
  readonly inputLog: PasswordInputHistoryLogObject[];
  readonly passwordComplexity: number;
}

const initialState: PasswordControlsStateInterface = {
  inputValue: "",
  inputLog: [],
  passwordComplexity: 0,
};

const passwordControlsReducer = (
  state: PasswordControlsStateInterface = initialState,
  action: PasswordControlsAction
) => {
  switch (action.type) {
    case VALUE_CHANGED: {
      const { payload } = action;
      return {
        ...state,
        inputValue: payload,
        passwordComplexity: calculatePasswordComplexity(payload),
      };
    }
    case KEY_DOWN: {
      const { payload } = action;
      return {
        ...state,
        inputLog: [...state.inputLog, { ...payload, keyUpTime: 0 }],
      };
    }
    case KEY_UP: {
      const { payload } = action;
      const formattedInputLog = insertUpTimeToLog(state.inputLog, payload);
      return {
        ...state,
        inputLog: formattedInputLog,
      };
    }
    case PASSWORD_CLEARED: {
      return {
        ...state,
        inputValue: "",
        inputLog: [],
        passwordComplexity: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default passwordControlsReducer;
