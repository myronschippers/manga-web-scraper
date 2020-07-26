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
    yield put({
      type: 'RAISE_ERROR',
      payload: {
        msg: 'There was an error with your search.'
      }
    });
  }
}

function* scannerChapters(action) {
  try {
    const chapterScraper = yield axios.post('/api/scraper/chapters', action.payload);
    yield put({
      type: 'TEST_CHAPTERS_SCRAPER',
      payload: chapterScraper,
    });
    // yield put({
    //   type: 'API_FETCH_SERIES_DETAILS',
    //   payload: {
    //     seriesId: action.payload.id
    //   }
    // });
  } catch(err) {
    console.log('Error with search:', err);
    yield put({
      type: 'RAISE_ERROR',
      payload: {
        msg: 'There was an error scanning for chapters.'
      }
    });
  }
}

function* scannerSaga() {
  yield takeLatest('API_SEARCH_MANGA', scannerSearch);
  yield takeLatest('API_SCRAPE_CHAPTERS', scannerChapters);
}

export default scannerSaga;
