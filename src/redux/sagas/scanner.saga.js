import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* scannerSearch(action) {
  try {
    yield put({ type: 'SHOW_SEARCH_LOADING' });
    const searchData = {
      term: action.payload
    };
    const response = yield axios.post('/api/scraper/search', searchData);

    yield put({type: 'SET_RESULTS', payload: response.data});
    yield put({ type: 'HIDE_SEARCH_LOADING' });
  } catch (err) {
    console.log('Error with search:', err);
    yield put({ type: 'RAISE_ERROR', payload: 'There was an error with your search.' });
  }
}

function* scannerSaga() {
  yield takeLatest('API_SEARCH_MANGA', scannerSearch);
}

export default scannerSaga;
