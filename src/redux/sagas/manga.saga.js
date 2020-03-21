import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* mangaSeriesSave(action) {
  try {
    const seriesData = {
      ...action.payload
    };
    yield axios.post('/api/manga/series', seriesData);

    yield put({ type: 'API_FETCH_SERIES' });
  } catch (err) {
    console.log('Error with series save:', err);
    yield put({
      type: 'RAISE_ERROR',
      payload: {
        msg: 'There was an error saving your series.'
      }
    });
  }
}

function* mangaSeriesFetch(action) {
  try {
    const seriesResp = yield axios.get('/api/manga/series');

    yield put({ type: 'SET_SERIES', payload: seriesResp.data });
  } catch(err) {
    console.log('Error with series get:', err);
    yield put({
      type: 'RAISE_ERROR',
      payload: {
        msg: 'There was an error getting saved series.'
      }
    });
  }
}

function* mangaSaga() {
  yield takeLatest('API_SAVE_SERIES', mangaSeriesSave);
  yield takeLatest('API_FETCH_SERIES', mangaSeriesFetch);
}

export default mangaSaga;
