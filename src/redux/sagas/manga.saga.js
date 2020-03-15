import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* mangaSeriesSave(action) {
  try {
    const seriesData = {
      ...action.payload
    };
    yield axios.post('/api/manga/series', seriesData);
    yield axios.get('/api/manga/series');

    yield put({ type: 'HIDE_SEARCH_LOADING' });
  } catch (err) {
    console.log('Error with search:', err);
    yield put({ type: 'RAISE_ERROR', payload: 'There was an error with your search.' });
  }
}

function* mangaSaga() {
  yield takeLatest('API_SAVE_SERIES', mangaSeriesSave);
}

export default mangaSaga;
