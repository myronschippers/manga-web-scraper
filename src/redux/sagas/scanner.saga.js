import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* scannerSearch(action) {
  try {
    // clear any existing error on the login page
    // yield put({ type: 'CLEAR_LOGIN_ERROR' });

    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    // yield axios.post('api/user/login', action.payload, config);

    const searchData = {
      term: action.payload
    };
    const response = yield axios.post('/api/scraper/search', searchData);
      // .then((searchSuccess) => {
      //   console.log('searchSuccess:', searchSuccess);
      //   this.setState({
      //     results: searchSuccess.data,
      //   });
      // })
      // .catch((searchErr) => {
      //   console.log(searchErr);
      // });
    
    // after the user has logged in
    // get the user information from the server
    yield put({type: 'SET_RESULTS', payload: response.data});
  } catch (err) {
    console.log('Error with search:', err);
    yield put({ type: 'RAISE_ERROR', payload: 'There was an error with your search.' });
  }
}

function* scannerSaga() {
  yield takeLatest('API_SEARCH_MANGA', scannerSearch);
}

export default scannerSaga;
