const searchLoadingReducer = (state = false, action) => {
  switch(action.type) {
    case 'SHOW_SEARCH_LOADING':
      return true;
    case 'HIDE_SEARCH_LOADING':
      return false;
    default:
      return state;
  }
}

export default searchLoadingReducer;