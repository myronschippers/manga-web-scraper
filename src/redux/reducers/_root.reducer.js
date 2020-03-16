import { combineReducers } from 'redux';
import results from './results.reducer';
import searchLoading from './searchLoading.reducer';
import series from './series.reducer';

const rootReducer = combineReducers({
  results,
  searchLoading,
  series,
});

export default rootReducer;
