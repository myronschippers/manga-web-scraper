const seriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SERIES':
      return action.payload;
    case 'CLEAR_SERIES':
      return [];
    default:
      return state;
  }
};

export default seriesReducer;
