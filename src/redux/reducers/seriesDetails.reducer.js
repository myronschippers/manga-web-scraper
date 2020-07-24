const defaultDetails = {
  author: '',
  chapters: [],
  created_at: '',
  id: null,
  path: '',
  thumbnail: '',
  title: '',
}

const seriesDetailsReducer = (state = defaultDetails, action) => {
  switch (action.type) {
    case 'SET_SERIES_DETAILS':
      return action.payload;
    case 'CLEAR_SERIES_DETAILS':
      return defaultDetails;
    default:
      return state;
  }
};

export default seriesDetailsReducer;
