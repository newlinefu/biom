import { AuthorizeStatus } from "../types/types";
import { put, call, takeEvery } from "redux-saga/effects";
import {
    AUTHORIZE,
    AuthorizeAction,
    authorizeRequested,
    authorizeFailure,
    authorizeSuccess
} from "../actions/vector-calculating";
import { authorization } from "../../../rest";

function* authorizationAsync(action: AuthorizeAction) {
    try {
        const { payload } = action;
        yield put(authorizeRequested());
        const response: AuthorizeStatus = yield call(() =>
            authorization(payload)
        );
        yield put(authorizeSuccess(response));
        alert(response.message);
    } catch (error) {
        yield put(authorizeFailure());
        alert('Something goes wrong');
    }
}

export function* watchAuthorizationAsync() {
    yield takeEvery(AUTHORIZE, authorizationAsync);
}