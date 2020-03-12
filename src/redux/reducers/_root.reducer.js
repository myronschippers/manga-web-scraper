import { combineReducers } from 'redux';
import results from './results.reducer';
import searchLoading from './searchLoading.reducer';

const rootReducer = combineReducers({
  results,
  searchLoading,
});

export default rootReducer;
