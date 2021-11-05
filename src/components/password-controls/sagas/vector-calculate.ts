import { VectorCalculatingResultData } from "../types/types";
import { put, call, takeEvery } from "redux-saga/effects";
import {
  VECTOR_CALCULATE,
  VectorCalculateAction,
  vectorCalculatingFailure,
  vectorCalculatingRequested,
  vectorCalculatingSuccess,
} from "../actions/vector-calculating";
import { registration } from "../../../rest";

function* vectorCalculateAsync(action: VectorCalculateAction) {
  try {
    const { payload } = action;
    yield put(vectorCalculatingRequested());
    const response: VectorCalculatingResultData = yield call(() =>
      registration(payload)
    );
    yield put(vectorCalculatingSuccess(response));
  } catch (error) {
    yield put(vectorCalculatingFailure("Error"));
  }
}

export function* watchVectorCalculatingAsync() {
  yield takeEvery(VECTOR_CALCULATE, vectorCalculateAsync);
}
