import { put } from 'redux-saga/effects';

export default function* rootSaga() {
  yield put({ type: 'CLICK' });
}
