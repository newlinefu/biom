import {
  RegistrationObject,
  VectorCalculatingResultData,
} from "../types/types";

const VECTOR_CALCULATING_REQUESTED = "VECTOR_CALCULATING_REQUESTED";
const VECTOR_CALCULATING_SUCCESS = "VECTOR_CALCULATING_SUCCESS";
const VECTOR_CALCULATING_FAILURE = "VECTOR_CALCULATING_FAILURE";

const VECTOR_CALCULATE = "VECTOR_CALCULATE";

export interface VectorCalculateAction {
  type: typeof VECTOR_CALCULATE;
  payload: RegistrationObject;
}

interface VectorCalculatingRequestedAction {
  type: typeof VECTOR_CALCULATING_REQUESTED;
}

interface VectorCalculatingSuccessAction {
  type: typeof VECTOR_CALCULATING_SUCCESS;
  payload: VectorCalculatingResultData;
}

interface VectorCalculatingFailureAction {
  type: typeof VECTOR_CALCULATING_FAILURE;
  error: string;
}

export type VectorCalculatingAction =
  | VectorCalculatingRequestedAction
  | VectorCalculatingSuccessAction
  | VectorCalculatingFailureAction;

const vectorCalculate =
  () =>
  (payload: RegistrationObject): VectorCalculateAction => ({
    type: VECTOR_CALCULATE,
    payload,
  });

const vectorCalculatingRequested = (): VectorCalculatingAction => ({
  type: VECTOR_CALCULATING_REQUESTED,
});

const vectorCalculatingSuccess = (
  payload: VectorCalculatingResultData
): VectorCalculatingAction => ({
  type: VECTOR_CALCULATING_SUCCESS,
  payload,
});

const vectorCalculatingFailure = (error: string): VectorCalculatingAction => ({
  type: VECTOR_CALCULATING_FAILURE,
  error,
});

export {
  VECTOR_CALCULATING_FAILURE,
  VECTOR_CALCULATING_SUCCESS,
  VECTOR_CALCULATING_REQUESTED,
  VECTOR_CALCULATE,
  vectorCalculatingFailure,
  vectorCalculatingRequested,
  vectorCalculatingSuccess,
  vectorCalculate,
};
