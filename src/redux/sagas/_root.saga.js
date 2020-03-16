import { all } from 'redux-saga/effects';
import scannerSaga from './scanner.saga';
import mangaSaga from './manga.saga';

// rootSaga is the primary saga.
export default function* rootSaga() {
  yield all([
    scannerSaga(),
    mangaSaga(),
  ]);
}
