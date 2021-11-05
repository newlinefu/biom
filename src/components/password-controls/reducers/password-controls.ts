import {
  PasswordInputHistoryLogObject,
  VectorCalculatingResultData,
} from "../types/types";
import {
  KEY_DOWN,
  KEY_UP,
  PASSWORD_CLEARED,
  VALUE_CHANGED,
  PasswordControlsAction,
} from "../actions/password-controls-actions";
import { calculatePasswordComplexity, insertUpTimeToLog } from "../utils/utils";
import {
  VECTOR_CALCULATING_SUCCESS,
  VectorCalculatingAction,
} from "../actions/vector-calculating";

export interface PasswordControlsStateInterface {
  readonly inputValue: string;
  readonly inputLog: PasswordInputHistoryLogObject[];
  readonly passwordComplexity: number;
  readonly vectorCalculatingResult: VectorCalculatingResultData | null;
}

const initialState: PasswordControlsStateInterface = {
  inputValue: "",
  inputLog: [],
  passwordComplexity: 0,
  vectorCalculatingResult: null,
};

const passwordControlsReducer = (
  state: PasswordControlsStateInterface = initialState,
  action: PasswordControlsAction | VectorCalculatingAction
) => {
  switch (action.type) {
    case VECTOR_CALCULATING_SUCCESS: {
      return {
        ...state,
        vectorCalculatingResult: action.payload,
      };
    }
    case VALUE_CHANGED: {
      const { payload } = action;
      if (payload === "") {
        return {
          ...state,
          inputLog: [],
          passwordComplexity: 0,
          vectorCalculatingResult: null,
          inputValue: payload,
        };
      }
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
        vectorCalculatingResult: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default passwordControlsReducer;
