const seriesDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SERIES_DETAILS':
      return action.payload;
    case 'CLEAR_SERIES_DETAILS':
      return {};
    default:
      return state;
  }
};

export default seriesDetailsReducer;
