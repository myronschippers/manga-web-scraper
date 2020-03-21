import { combineReducers } from 'redux';
import results from './results.reducer';
import searchLoading from './searchLoading.reducer';
import series from './series.reducer';
import msgAlert from './msgAlert.reducer';

const rootReducer = combineReducers({
  results,
  searchLoading,
  series,
  msgAlert,
});

export default rootReducer;
