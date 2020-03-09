import { combineReducers } from 'redux';
import results from './results.reducer';

const rootReducer = combineReducers({
  results,
});

export default rootReducer;
