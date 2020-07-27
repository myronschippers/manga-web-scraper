const defaultChapter = {
  name: '',
  title: '',
  path: '',
  sequence: '',
  created_at: '',
  series_id: '',
  is_read: '',
  pages: [],
};

function chapterDetailsReducer(state = defaultChapter, action) {
  switch (action.type) {
    case 'SET_CHAPTER_DETAILS':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_CHAPTER_DETAILS':
      return defaultChapter;
    default:
      return state;
  }
}

export default chapterDetailsReducer;