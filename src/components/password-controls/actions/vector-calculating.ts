import {
  RegistrationObject,
  VectorCalculatingResultData,
  AuthorizationObject,
  AuthorizeStatus,
} from "../types/types";

const VECTOR_CALCULATING_REQUESTED = "VECTOR_CALCULATING_REQUESTED";
const VECTOR_CALCULATING_SUCCESS = "VECTOR_CALCULATING_SUCCESS";
const VECTOR_CALCULATING_FAILURE = "VECTOR_CALCULATING_FAILURE";

const AUTHORIZATION_REQUESTED = "AUTHORIZATION_REQUESTED";
const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
const AUTHORIZATION_FAILURE = "AUTHORIZATION_FAILURE";

const VECTOR_CALCULATE = "VECTOR_CALCULATE";
const AUTHORIZE = "AUTHORIZE";

export interface AuthorizeAction {
  type: typeof AUTHORIZE;
  payload: AuthorizationObject;
}
export interface AuthorizeRequestedAction {
  type: typeof AUTHORIZATION_REQUESTED;
}
export interface AuthorizeSuccessAction {
  type: typeof AUTHORIZATION_SUCCESS;
  payload: AuthorizeStatus;
}
export interface AuthorizeFailureAction {
  type: typeof AUTHORIZATION_FAILURE;
}

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
  | VectorCalculatingFailureAction
  | AuthorizeRequestedAction
  | AuthorizeFailureAction
  | AuthorizeSuccessAction;

const authorize =
  () =>
  (payload: AuthorizationObject): AuthorizeAction => ({
    type: AUTHORIZE,
    payload,
  });
const authorizeRequested = (): VectorCalculatingAction => ({
  type: AUTHORIZATION_REQUESTED,
});
const authorizeSuccess = (
  payload: AuthorizeStatus
): VectorCalculatingAction => ({
  type: AUTHORIZATION_SUCCESS,
  payload,
});
const authorizeFailure = (): VectorCalculatingAction => ({
  type: AUTHORIZATION_FAILURE,
});

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
  AUTHORIZE,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_REQUESTED,
  AUTHORIZATION_FAILURE,
  vectorCalculatingFailure,
  vectorCalculatingRequested,
  vectorCalculatingSuccess,
  vectorCalculate,
  authorize,
  authorizeSuccess,
  authorizeFailure,
  authorizeRequested,
};
