import { all } from 'redux-saga/effects';
import scannerSaga from './login.saga';

// rootSaga is the primary saga.
export default function* rootSaga() {
  yield all([
    scannerSaga(),
  ]);
}
