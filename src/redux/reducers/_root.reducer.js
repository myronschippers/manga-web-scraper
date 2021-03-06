import { combineReducers } from 'redux';
import results from './results.reducer';
import searchLoading from './searchLoading.reducer';
import series from './series.reducer';
import msgAlert from './msgAlert.reducer';
import seriesDetails from './seriesDetails.reducer';
import chapterDetails from './chapterDetails.reducer';

const rootReducer = combineReducers({
  results,
  searchLoading,
  series,
  msgAlert,
  seriesDetails,
  chapterDetails,
});

export default rootReducer;
